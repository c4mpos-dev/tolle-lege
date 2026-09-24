import { Bounds, Center, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CanvasLoader } from '@/components/three/CanvasLoader'
import { SwayRotation } from '@/components/three/SwayRotation'
import { ChurchModel } from './ChurchModel'

export function ChurchViewer() {
  return (
    <div className="relative size-full">
      <Canvas camera={{ position: [0, 2, 10], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <ChurchModel />
            </Center>
          </Bounds>
        </Suspense>
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
        />
        <SwayRotation amplitude={Math.PI / 5} />
      </Canvas>
      <CanvasLoader />
    </div>
  )
}
