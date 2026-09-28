import { Environment, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { MotionValue } from 'motion/react'
import { type RefObject, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  type Group,
  type Material,
  MathUtils,
  type Mesh,
  NormalBlending,
  ShaderMaterial,
  Vector2,
  Vector3,
} from 'three'
import { CHURCH_MODEL_URL, ENVIRONMENT_HDR_URL } from '../constants'
import { modelFrame, sampleChurch, type PointCloud } from '../particles/sampleChurch'
import { sampleText } from '../particles/sampleText'
import { fragmentShader, vertexShader } from '../particles/shaders'

const TEXT = 'Tolle Lege'

function setCursor(element: HTMLElement, cursor: string) {
  if (element.style.cursor !== cursor) element.style.cursor = cursor
}

/** Balanço automático: até ~36° para cada lado, sem mostrar a parte de trás. */
const SWAY_AMPLITUDE = Math.PI / 5
const SWAY_SPEED = 0.35
/** Tempo parado, depois de arrastar, até o balanço voltar. */
const RESUME_DELAY_MS = 3000
const INK = [0.3, 0.2, 0.12]

function createUniforms() {
  return {
    uTime: { value: 0 },
    uIntro: { value: 0 },
    uMorph: { value: 0 },
    uSize: { value: 30 },
    uChurchSize: { value: 24 },
    uPixelRatio: { value: 1 },
    uTextScale: { value: 8 },
    uChurchScale: { value: 4 },
    uTextOffset: { value: new Vector3() },
    uChurchOffset: { value: new Vector3() },
    uRotation: { value: 0 },
    uTilt: { value: 0 },
    uFade: { value: 0 },
    uMouse: { value: new Vector2(10, 10) },
    uMouseStrength: { value: 0 },
    uAspect: { value: 1 },
  }
}

/** Geometria inicial: cada partícula começa espalhada, com valores aleatórios próprios. */
function createParticleGeometry(count: number) {
  const scatter = new Float32Array(count * 3)
  const random = new Float32Array(count * 4)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    scatter[i * 3] = (Math.random() - 0.5) * 20
    scatter[i * 3 + 1] = (Math.random() - 0.5) * 12
    scatter[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    for (let j = 0; j < 4; j++) random[i * 4 + j] = Math.random()
    colors.set(INK, i * 3)
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(scatter, 3))
  geometry.setAttribute('aScatter', new BufferAttribute(scatter, 3))
  geometry.setAttribute('aText', new BufferAttribute(scatter.slice(), 3))
  geometry.setAttribute('aChurch', new BufferAttribute(scatter.slice(), 3))
  geometry.setAttribute('aColor', new BufferAttribute(colors, 3))
  geometry.setAttribute('aRandom', new BufferAttribute(random, 4))
  return geometry
}

type ParticleChurchProps = {
  /** 0 = texto "Tolle Lege", 1 = igreja formada. */
  morph: MotionValue<number>
  /** Pula as animações e mostra a igreja pronta. */
  reducedMotion: boolean
  /** Tela larga: igreja maior, no centro. Estreita: menor, na metade de cima. */
  wide: boolean
  /** Altura do horizonte (fração da tela, a partir do topo) onde a base da igreja se apoia. */
  horizon: number
  /**
   * Recebe `--church-y` (centro da igreja, % a partir do topo) e `--church-size` (altura em px),
   * para a página alinhar decorações em HTML atrás da igreja.
   */
  layoutTarget?: RefObject<HTMLElement | null>
}

type Uniforms = ReturnType<typeof createUniforms>

/**
 * "A Palavra vira Igreja": partículas douradas formam o nome do site e, ao rolar, voam até a
 * superfície da igreja, onde se dissolvem e dão lugar ao objeto 3D real.
 */
export function ParticleChurch(props: ParticleChurchProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden
    >
      <ParticleField {...props} />
    </Canvas>
  )
}

function ParticleField({ morph, reducedMotion, wide, horizon, layoutTarget }: ParticleChurchProps) {
  const count = useMemo(() => (window.innerWidth < 768 ? 16_000 : 22_000), [])
  const churchAspect = useRef(1.3)
  const churchLoaded = useRef(false)
  const introStart = useRef<number | null>(null)
  const mouse = useRef({ ndc: new Vector2(10, 10), clientX: 0, lastMove: -Infinity })
  const drag = useRef({ active: false, startX: 0, startRotation: 0, releasedAt: -Infinity })
  const swayPhase = useRef(0)
  const lastLayout = useRef('')
  const canvas = useThree((state) => state.gl.domElement)

  const geometry = useMemo(() => createParticleGeometry(count), [count])

  // O material é mutado a cada quadro pelo useFrame; por isso fica num ref.
  const materialRef = useRef<ShaderMaterial>(null)
  const [uniforms] = useState(createUniforms)

  useEffect(() => () => geometry.dispose(), [geometry])

  // Pontos do texto: assim que a fonte carrega.
  useEffect(() => {
    let alive = true
    sampleText(TEXT, count).then((positions) => {
      if (!alive) return
      const text = geometry.getAttribute('aText') as BufferAttribute
      const church = geometry.getAttribute('aChurch') as BufferAttribute
      text.copyArray(positions).needsUpdate = true
      // Até a igreja carregar, o "destino" é o próprio texto (sem sobrescrever se ela chegou antes).
      if (!churchLoaded.current) church.copyArray(positions).needsUpdate = true
      introStart.current = -1 // sinaliza ao useFrame que a animação pode começar
    })
    return () => {
      alive = false
    }
  }, [count, geometry])

  // Pontos da igreja: quando o modelo 3D termina de carregar.
  const onChurchReady = useCallback(
    (cloud: PointCloud) => {
      const church = geometry.getAttribute('aChurch') as BufferAttribute
      const colors = geometry.getAttribute('aColor') as BufferAttribute
      church.copyArray(cloud.positions).needsUpdate = true
      colors.copyArray(cloud.colors).needsUpdate = true
      churchAspect.current = cloud.aspect
      churchLoaded.current = true
    },
    [geometry],
  )

  // Cursor (só mouse; no toque o dedo rola a página).
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      mouse.current.ndc.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      )
      mouse.current.clientX = event.clientX
      mouse.current.lastMove = performance.now()
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  /**
   * Arrastando: segue o mouse (volta inteira = largura da tela).
   * Solto há pouco: fica parada. Depois: volta ao balanço pelo caminho mais curto.
   */
  const nextRotation = (current: number, delta: number) => {
    const d = drag.current
    if (d.active) {
      const dx = mouse.current.clientX - d.startX
      return d.startRotation + (dx / window.innerWidth) * Math.PI * 2
    }
    if (performance.now() - d.releasedAt < RESUME_DELAY_MS) return current

    const target = reducedMotion ? 0.35 : SWAY_AMPLITUDE * Math.sin(swayPhase.current)
    if (!reducedMotion) swayPhase.current += delta * SWAY_SPEED
    const diff = Math.atan2(Math.sin(target - current), Math.cos(target - current))
    return current + diff * Math.min(1, delta * 2)
  }

  // Arrastar com o mouse gira a igreja livremente (só depois que ela se formou).
  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      const fade = materialRef.current?.uniforms.uFade.value ?? 0
      if (event.pointerType !== 'mouse' || fade < 0.5) return
      drag.current.active = true
      drag.current.startX = event.clientX
      drag.current.startRotation = materialRef.current?.uniforms.uRotation.value ?? 0
      canvas.setPointerCapture(event.pointerId)
    }
    const onUp = (event: PointerEvent) => {
      if (!drag.current.active) return
      drag.current.active = false
      drag.current.releasedAt = performance.now()
      canvas.releasePointerCapture(event.pointerId)
    }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
    }
  }, [canvas])

  useFrame((state, delta) => {
    const material = materialRef.current
    if (!material) return
    const u = material.uniforms
    const time = state.clock.elapsedTime
    const { width, height } = state.viewport
    u.uTime.value = time
    u.uPixelRatio.value = state.viewport.dpr
    u.uAspect.value = state.size.width / state.size.height

    // Poeira → texto (começa quando os pontos do texto ficam prontos)
    if (introStart.current === -1) introStart.current = time
    if (introStart.current !== null) {
      u.uIntro.value = reducedMotion ? 1 : Math.min((time - introStart.current) / 2.6, 1)
    }

    // Texto → igreja, suavizado
    const targetMorph = reducedMotion ? 1 : morph.get()
    u.uMorph.value = MathUtils.damp(u.uMorph.value, targetMorph, 5, delta)

    // No fim do voo, as partículas se dissolvem e o modelo 3D aparece (só se ele já carregou)
    u.uFade.value = churchLoaded.current ? MathUtils.smoothstep(u.uMorph.value, 0.8, 0.97) : 0

    // Layout responsivo: a igreja fica centrada, com a base apoiada na linha do horizonte.
    const aspect = churchAspect.current
    u.uTextScale.value = Math.min(width * 0.82, 11)
    // Pontos menores em telas estreitas: com brilho aditivo, texto pequeno "estoura" em branco.
    u.uSize.value = 30 * MathUtils.clamp(width / 11, 0.5, 1)
    u.uChurchSize.value = wide ? 24 : 26
    u.uTextOffset.value.set(0, wide ? height * 0.08 : height * 0.1, 0)
    const scale = wide
      ? Math.min(height * 0.6, (width * 0.39) / aspect)
      : Math.min(height * 0.32, (width * 0.7) / aspect)
    u.uChurchScale.value = scale
    // O modelo tem altura 1 e centro na origem; afunda um pouco para "pisar" no chão.
    u.uChurchOffset.value.set(0, height * (0.5 - horizon) + scale * 0.47, 0)

    const target = layoutTarget?.current
    if (target) {
      const y = ((0.5 - u.uChurchOffset.value.y / height) * 100).toFixed(2)
      const size = ((scale / height) * state.size.height).toFixed(1)
      const layout = `${y}|${size}`
      if (layout !== lastLayout.current) {
        lastLayout.current = layout
        target.style.setProperty('--church-y', `${y}%`)
        target.style.setProperty('--church-size', `${size}px`)
      }
    }
    // A igreja fica acima da câmera; sem inclinar, veríamos a parte de baixo dela.
    // Compensa esse ângulo e, no celular, inclina um pouco mais para mostrar o telhado.
    const aboveCamera = Math.atan2(u.uChurchOffset.value.y, state.camera.position.z)
    u.uTilt.value = aboveCamera + (wide ? 0.05 : 0.12)

    u.uRotation.value = nextRotation(u.uRotation.value, delta)
    // Cursor de "agarrar" só quando a igreja já está formada, em telas de desktop
    const canDrag = u.uFade.value > 0.5 && state.size.width >= 1024
    setCursor(canvas, canDrag ? (drag.current.active ? 'grabbing' : 'grab') : '')

    // O cursor espalha as partículas; o efeito some quando o mouse para
    const active = performance.now() - mouse.current.lastMove < 1500 ? 1 : 0
    u.uMouse.value.copy(mouse.current.ndc)
    u.uMouseStrength.value = MathUtils.damp(u.uMouseStrength.value, active, 4, delta)
  })

  return (
    <>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={NormalBlending}
        />
      </points>
      <Suspense fallback={null}>
        <Environment files={ENVIRONMENT_HDR_URL} environmentIntensity={0.8} />
        {/* Luz quente e baixa, do sol nascendo no horizonte */}
        <directionalLight position={[-6, 6, 7]} intensity={1.7} color="#ffcf94" />
        <ChurchModel count={count} materialRef={materialRef} onReady={onChurchReady} />
      </Suspense>
    </>
  )
}

/** Opacidade do modelo; volta a ser opaco no fim, para a ordem de profundidade ficar correta. */
function applyFade(materials: Material[], fade: number) {
  const opaque = fade > 0.999
  for (const material of materials) {
    material.opacity = fade
    if (material.transparent === opaque) {
      material.transparent = !opaque
      material.needsUpdate = true
    }
  }
}

type ChurchModelProps = {
  count: number
  /** Material das partículas: o modelo lê dele posição, escala, rotação e o quanto já apareceu. */
  materialRef: RefObject<ShaderMaterial | null>
  onReady: (cloud: PointCloud) => void
}

/** O objeto 3D real, no mesmo lugar, escala e rotação da igreja de partículas. */
function ChurchModel({ count, materialRef, onReady }: ChurchModelProps) {
  const { scene } = useGLTF(CHURCH_MODEL_URL)
  const groupRef = useRef<Group>(null)
  const materials = useRef<Material[]>([])
  const [frame] = useState(() => modelFrame(scene))

  useEffect(() => {
    // Materiais transparentes enquanto a igreja "materializa"
    const found = new Set<Material>()
    scene.traverse((object) => {
      const mesh = object as Mesh
      if (!mesh.isMesh) return
      for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
        found.add(material)
      }
    })
    materials.current = [...found]
    onReady(sampleChurch(scene, count))
  }, [scene, count, onReady])

  useFrame(() => {
    const group = groupRef.current
    // O R3F copia o objeto de uniforms ao criar o material: a fonte da verdade é o material.
    const uniforms = materialRef.current?.uniforms as Uniforms | undefined
    if (!group || !uniforms) return
    const fade = uniforms.uFade.value
    group.visible = fade > 0.001
    if (!group.visible) return

    group.position.copy(uniforms.uChurchOffset.value)
    // Euler XYZ: aplica o giro em Y e depois a inclinação em X, como no shader
    group.rotation.set(uniforms.uTilt.value, uniforms.uRotation.value, 0)
    group.scale.setScalar(uniforms.uChurchScale.value)

    applyFade(materials.current, fade)
  })

  const { center, height } = frame
  return (
    <group ref={groupRef} visible={false}>
      <primitive
        object={scene}
        scale={1 / height}
        position={[-center.x / height, -center.y / height, -center.z / height]}
      />
    </group>
  )
}

useGLTF.preload(CHURCH_MODEL_URL)
