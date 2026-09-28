/*
 * Cada partícula conhece três posições: espalhada (poeira), no texto e na igreja.
 * uIntro leva da poeira ao texto; uMorph leva do texto à igreja, num voo em arco.
 * uFade dissolve as partículas quando o objeto 3D real aparece no lugar delas;
 * uma pequena parte continua flutuando em volta, como poeira de luz.
 */

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uMorph;
  uniform float uSize;
  uniform float uChurchSize;
  uniform float uPixelRatio;
  uniform float uTextScale;
  uniform float uChurchScale;
  uniform vec3 uTextOffset;
  uniform vec3 uChurchOffset;
  uniform float uRotation;
  uniform float uTilt;
  uniform float uFade;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uAspect;

  attribute vec3 aScatter;
  attribute vec3 aText;
  attribute vec3 aChurch;
  attribute vec3 aColor;
  attribute vec4 aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  float easeInOut(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  void main() {
    float delay = aRandom.x;

    // Poeira → texto
    float intro = easeInOut(clamp((uIntro - delay * 0.45) / 0.55, 0.0, 1.0));
    vec3 textPos = aText * uTextScale + uTextOffset;
    vec3 p = mix(aScatter, textPos, intro);

    // Texto → igreja: gira no eixo vertical e depois inclina para a frente (mesma ordem do modelo 3D)
    vec3 c = aChurch * uChurchScale;
    float cs = cos(uRotation);
    float sn = sin(uRotation);
    c = vec3(c.x * cs + c.z * sn, c.y, -c.x * sn + c.z * cs);
    float ct = cos(uTilt);
    float st = sin(uTilt);
    c = vec3(c.x, c.y * ct - c.z * st, c.y * st + c.z * ct) + uChurchOffset;

    float morph = easeInOut(clamp((uMorph - delay * 0.35) / 0.65, 0.0, 1.0));
    vec3 swirl = (aRandom.yzw - 0.5) * 5.0 * sin(3.14159 * morph);
    p = mix(p, c, morph) + swirl;

    // Sobreviventes (~4%) se afastam da superfície e ficam pairando em volta da igreja
    float survivor = 1.0 - step(0.04, aRandom.x);
    p += survivor * uFade * (aRandom.yzw - 0.5) * uChurchScale * 0.7;

    // Brilho vivo: cada partícula oscila de leve
    p += 0.012 * vec3(
      sin(uTime * 1.3 + aRandom.y * 40.0),
      cos(uTime * 1.1 + aRandom.z * 40.0),
      sin(uTime * 0.9 + aRandom.w * 40.0)
    );

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // O cursor afasta as partículas próximas (em espaço de tela)
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 dir = (ndc - uMouse) * vec2(uAspect, 1.0);
    float force = uMouseStrength * smoothstep(0.35, 0.0, length(dir));
    mv.xy += normalize(dir + 1e-5) * force * 0.7;

    gl_Position = projectionMatrix * mv;
    // Texto e igreja têm tamanhos próprios de ponto (o texto varia com a largura da tela).
    gl_PointSize = mix(uSize, uChurchSize, morph) * uPixelRatio * (0.55 + aRandom.x * 0.9) / -mv.z;

    // Tinta no papel: sépia com pontos de ouro no texto; cores do modelo, escurecidas, na igreja
    vec3 ink = mix(vec3(0.3, 0.2, 0.12), vec3(0.66, 0.49, 0.22), step(0.62, aRandom.w));
    vColor = mix(ink, aColor * 0.55, morph);
    vAlpha = (0.6 + 0.4 * (0.5 + 0.5 * sin(uTime * 1.7 + aRandom.y * 60.0))) * mix(0.85, 0.7, morph)
      * mix(1.0 - uFade, 1.0, survivor);
  }
`

export const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`
