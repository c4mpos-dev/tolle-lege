import { Box3, Color, Mesh, type Material, type Object3D, Vector3 } from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'

export type PointCloud = {
  /** xyz por ponto, normalizado: altura 1, centrado na origem. */
  positions: Float32Array
  /** rgb por ponto (0-1). */
  colors: Float32Array
  /** Largura ÷ altura do modelo (para caber na tela). */
  aspect: number
}

/** Centro e altura do modelo: a mesma normalização vale para os pontos e para o objeto 3D. */
export function modelFrame(root: Object3D) {
  root.updateMatrixWorld(true)
  const box = new Box3().setFromObject(root)
  const size = box.getSize(new Vector3())
  return { center: box.getCenter(new Vector3()), height: size.y, aspect: Math.max(size.x, size.z) / size.y }
}

const WARM_TINT = new Color('#f1d9a8')

function materialColor(material: Material | Material[]) {
  const first = Array.isArray(material) ? material[0] : material
  const color = 'color' in first && first.color instanceof Color ? first.color.clone() : new Color('#dddddd')
  // Um toque dourado para as cores conversarem com a luz do site.
  return color.lerp(WARM_TINT, 0.3)
}

/**
 * Sorteia `count` pontos na superfície do modelo, proporcionalmente à área de cada malha,
 * guardando a cor do material de cada ponto.
 */
export function sampleChurch(root: Object3D, count: number): PointCloud {
  root.updateMatrixWorld(true)

  const parts: { sampler: MeshSurfaceSampler; mesh: Mesh; color: Color; cumulative: number }[] = []
  let totalArea = 0

  root.traverse((object) => {
    const mesh = object as Mesh
    if (!mesh.isMesh || !mesh.geometry.attributes.position) return
    const sampler = new MeshSurfaceSampler(mesh).build()
    // O último valor da distribuição é a área total da malha.
    const area = sampler.distribution?.[sampler.distribution.length - 1] ?? 0
    if (area <= 0) return
    totalArea += area
    parts.push({ sampler, mesh, color: materialColor(mesh.material), cumulative: totalArea })
  })

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const point = new Vector3()

  for (let i = 0; i < count; i++) {
    // Busca binária da malha sorteada, ponderada pela área.
    const target = Math.random() * totalArea
    let low = 0
    let high = parts.length - 1
    while (low < high) {
      const mid = (low + high) >> 1
      if (parts[mid].cumulative < target) low = mid + 1
      else high = mid
    }
    const part = parts[low]
    part.sampler.sample(point)
    point.applyMatrix4(part.mesh.matrixWorld)
    point.toArray(positions, i * 3)
    part.color.toArray(colors, i * 3)
  }

  // Normaliza: centro na origem e altura 1 (igual ao objeto 3D, para os dois coincidirem).
  const { center, height, aspect } = modelFrame(root)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (positions[i * 3] - center.x) / height
    positions[i * 3 + 1] = (positions[i * 3 + 1] - center.y) / height
    positions[i * 3 + 2] = (positions[i * 3 + 2] - center.z) / height
  }

  return { positions, colors, aspect }
}
