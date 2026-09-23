import { useGLTF } from '@react-three/drei'
import { CHURCH_MODEL_URL } from '../constants'

export function ChurchModel() {
  const { scene } = useGLTF(CHURCH_MODEL_URL)

  return <primitive object={scene} />
}

useGLTF.preload(CHURCH_MODEL_URL)
