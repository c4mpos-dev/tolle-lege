import { Bounds, Center, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CanvasLoader } from '@/components/three/CanvasLoader'
import { ChurchModel } from './ChurchModel'

export function ChurchViewer() {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 40 }} dpr={[1, 2]}>
      <Suspense fallback={<CanvasLoader />}>
        <Environment preset="city" />
        <Bounds fit clip observe margin={1.1}>
          <Center>
            <ChurchModel />
          </Center>
        </Bounds>
      </Suspense>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.6}
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
