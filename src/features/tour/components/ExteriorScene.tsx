import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Box3, Color, MathUtils, type Material, Matrix4, type Mesh, MeshStandardMaterial, type Object3D, Spherical, Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { CHURCH_MODEL_URL, ENVIRONMENT_HDR_URL } from '@/features/church'
import type { ExteriorStop } from '../data'

/** Altura da igreja na cena (unidades 3D). */
const MODEL_HEIGHT = 4
const OVERVIEW = { azimuth: 0.55, polar: 1.12, distance: 13 }
const HIGHLIGHT = new Color('#e3b863')

type Anchor = { position: Vector3; outward: Vector3; meshes: Mesh[] }

/**
 * Caixa das malhas que passam no filtro, no espaço local do modelo
 * (ignora a posição/escala que outras telas, como a hero, aplicam ao objeto raiz).
 */
function localBox(root: Object3D, filter: (mesh: Mesh) => boolean) {
  root.updateMatrixWorld(true)
  const inverse = root.matrixWorld.clone().invert()
  const relative = new Matrix4()
  const box = new Box3()
  root.traverse((object) => {
    const mesh = object as Mesh
    if (!mesh.isMesh || !filter(mesh)) return
    mesh.geometry.computeBoundingBox()
    relative.multiplyMatrices(inverse, mesh.matrixWorld)
    box.union(mesh.geometry.boundingBox!.clone().applyMatrix4(relative))
  })
  return box
}

const matchesStop = (mesh: Mesh, prefixes: string[]) =>
  prefixes.some((prefix) => mesh.name.startsWith(prefix) || mesh.parent?.name.startsWith(prefix))

type ExteriorSceneProps = {
  stops: ExteriorStop[]
  selected: number | null
  onSelect: (index: number) => void
}

/** Igreja 3D com pontos numerados sobre as peças; selecionar um ponto leva a câmera até ele. */
export function ExteriorScene({ stops, selected, onSelect }: ExteriorSceneProps) {
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [ready, setReady] = useState(false)

  return (
    <div className="relative size-full touch-none">
      <Canvas camera={{ position: [5, 3, 11], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment files={ENVIRONMENT_HDR_URL} environmentIntensity={0.8} />
          <directionalLight position={[-6, 9, 7]} intensity={1.6} color="#ffe1ad" />
          <TourModel stops={stops} selected={selected} markerRefs={markerRefs} onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>

      {/* Pontos clicáveis: botões HTML posicionados sobre o 3D a cada quadro */}
      {ready &&
        stops.map((stop, index) => (
          <button
            key={stop.id}
            ref={(element) => {
              markerRefs.current[index] = element
            }}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`${index + 1}. ${stop.title}`}
            aria-pressed={selected === index}
            className="group absolute top-0 left-0 flex size-9 items-center justify-center rounded-full border-2 border-canvas bg-primary-strong font-serif text-sm text-canvas shadow-[0_4px_16px_rgb(0_0_0/0.35)] transition-[opacity,background-color,scale] duration-200 hover:scale-110 aria-pressed:scale-125 aria-pressed:bg-ink"
            style={{ opacity: 0 }}
          >
            <span aria-hidden className="absolute inset-0 rounded-full bg-primary/50 motion-safe:animate-ping group-aria-pressed:hidden" />
            <span className="relative">{index + 1}</span>
          </button>
        ))}

      {!ready && (
        <p role="status" className="absolute inset-0 flex items-center justify-center text-sm text-canvas/70">
          Carregando a igreja…
        </p>
      )}
    </div>
  )
}

type TourModelProps = {
  stops: ExteriorStop[]
  selected: number | null
  markerRefs: RefObject<(HTMLButtonElement | null)[]>
  onReady: () => void
}

function TourModel({ stops, selected, markerRefs, onReady }: TourModelProps) {
  const { scene } = useGLTF(CHURCH_MODEL_URL)
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera, size } = useThree()

  // Cópia própria do modelo, com materiais opacos novos (a hero mexe na opacidade dos originais).
  const model = useMemo(() => {
    const clone = scene.clone(true)
    const copies = new Map<Material, Material>()
    clone.traverse((object) => {
      const mesh = object as Mesh
      if (!mesh.isMesh) return
      const original = mesh.material as Material
      if (!copies.has(original)) {
        const copy = original.clone()
        copy.opacity = 1
        copy.transparent = false
        copies.set(original, copy)
      }
      mesh.material = copies.get(original)!
    })
    // A posição e a escala ficam no <group> abaixo; o clone em si fica neutro.
    clone.position.set(0, 0, 0)
    clone.rotation.set(0, 0, 0)
    clone.scale.set(1, 1, 1)
    return clone
  }, [scene])

  const frame = useMemo(() => {
    const box = localBox(model, () => true)
    return { center: box.getCenter(new Vector3()), height: box.getSize(new Vector3()).y }
  }, [model])
  const scale = MODEL_HEIGHT / frame.height
  const center = useMemo(() => new Vector3(0, MODEL_HEIGHT / 2, 0), [])

  // Âncora de cada ponto: centro das peças correspondentes, já na escala da cena.
  const anchors = useMemo<Anchor[]>(() => {
    const toScene = (v: Vector3) =>
      new Vector3((v.x - frame.center.x) * scale, (v.y - frame.center.y) * scale + MODEL_HEIGHT / 2, (v.z - frame.center.z) * scale)
    return stops.map((stop) => {
      const meshes: Mesh[] = []
      model.traverse((object: Object3D) => {
        const mesh = object as Mesh
        if (mesh.isMesh && matchesStop(mesh, stop.nodes)) meshes.push(mesh)
      })
      const box = localBox(model, (mesh) => matchesStop(mesh, stop.nodes))
      const position = toScene(box.isEmpty() ? frame.center.clone() : box.getCenter(new Vector3()))
      const outward = new Vector3(position.x, 0, position.z)
      if (outward.lengthSq() < 1e-4) outward.set(0, 0, 1)
      return { position, outward: outward.normalize(), meshes }
    })
  }, [model, stops, frame, scale])

  useEffect(onReady, [onReady])

  // Destaque dourado nas peças do ponto selecionado
  useEffect(() => {
    const anchor = selected !== null ? anchors[selected] : null
    if (!anchor) return
    const originals = anchor.meshes.map((mesh) => mesh.material as MeshStandardMaterial)
    anchor.meshes.forEach((mesh, index) => {
      const glow = originals[index].clone()
      glow.emissive = HIGHLIGHT
      glow.emissiveIntensity = 0.55
      mesh.material = glow
    })
    return () => {
      anchor.meshes.forEach((mesh, index) => {
        ;(mesh.material as Material).dispose()
        mesh.material = originals[index]
      })
    }
  }, [anchors, selected])

  // Destino da câmera: visão geral ou o ponto selecionado
  const goal = useRef<{ target: Vector3; position: Vector3 } | null>(null)
  useEffect(() => {
    const anchor = selected !== null ? anchors[selected] : null
    const view = selected !== null ? stops[selected].view : undefined
    const target = anchor ? anchor.position.clone() : center.clone()
    const azimuth = anchor ? Math.atan2(anchor.outward.x, anchor.outward.z) : OVERVIEW.azimuth
    const spherical = new Spherical(
      view?.distance ?? (anchor ? 5 : OVERVIEW.distance),
      view?.polar ?? (anchor ? 1.2 : OVERVIEW.polar),
      azimuth,
    )
    // Em telas estreitas, afasta um pouco a câmera para caber tudo
    if (size.width < size.height) spherical.radius *= 1.35
    goal.current = { target, position: target.clone().add(new Vector3().setFromSpherical(spherical)) }
  }, [selected, anchors, stops, center, size.width, size.height])

  // Arrastar interrompe o voo da câmera
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    const stop = () => {
      goal.current = null
    }
    controls.addEventListener('start', stop)
    return () => controls.removeEventListener('start', stop)
  }, [])

  const projected = useMemo(() => new Vector3(), [])
  const toCamera = useMemo(() => new Vector3(), [])

  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (controls && goal.current) {
      const t = 1 - Math.exp(-3.2 * delta)
      camera.position.lerp(goal.current.position, t)
      controls.target.lerp(goal.current.target, t)
      controls.update()
      if (camera.position.distanceTo(goal.current.position) < 0.01) goal.current = null
    }

    // Posiciona os botões e esconde os que estão atrás da igreja
    anchors.forEach((anchor, index) => {
      const element = markerRefs.current?.[index]
      if (!element) return
      projected.copy(anchor.position).project(camera)
      toCamera.copy(camera.position).sub(anchor.position).setY(0).normalize()
      const facing = anchor.outward.dot(toCamera)
      const visible = projected.z < 1 && facing > -0.15
      const x = ((projected.x + 1) / 2) * size.width
      const y = ((1 - projected.y) / 2) * size.height
      // "translate" (e não "transform"): assim o scale do ponto selecionado não amplia o deslocamento
      // O ponto selecionado sobe um pouco, para não cobrir a peça em destaque
      const lift = index === selected ? 34 : 0
      element.style.translate = `${x - 18}px ${y - 18 - lift}px`
      element.style.opacity = visible ? String(MathUtils.clamp((facing + 0.15) * 4, 0, 1)) : '0'
      element.style.pointerEvents = visible ? 'auto' : 'none'
      element.tabIndex = visible ? 0 : -1
    })
  })

  return (
    <>
      <group
        scale={scale}
        position={[-frame.center.x * scale, -frame.center.y * scale + MODEL_HEIGHT / 2, -frame.center.z * scale]}
      >
        <primitive object={model} />
      </group>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={2.5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2 - 0.05}
        target={[0, MODEL_HEIGHT / 2, 0]}
      />
    </>
  )
}
