"use client"

import type React from "react"
import { forwardRef } from "react"
import { Shader } from "react-shaders"
import { cn } from "@/lib/utils"

export interface MatrixShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Digital rain speed
   * @default 1.0
   */
  speed?: number

  /**
   * Rain density and column count
   * @default 1.0
   */
  density?: number

  /**
   * Character brightness and contrast
   * @default 1.0
   */
  brightness?: number

  /**
   * Green color intensity
   * @default 1.0
   */
  greenIntensity?: number

  /**
   * Character variation and randomness
   * @default 1.0
   */
  variation?: number
}

// Use #00FF6F as the primary matrix color
const fragmentShader = `
// Hash function for pseudo-random values
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Generate pseudo-random character patterns
float character(vec2 p, float seed) {
    p = floor(p);
    float h = hash(p + seed);

    // Create blocky character patterns
    vec2 charGrid = fract(p * 0.5);
    float char = 0.0;

    // Generate different character shapes based on hash
    if(h < 0.2) {
        // Vertical lines
        char = step(0.3, charGrid.x) * step(charGrid.x, 0.7);
    } else if(h < 0.4) {
        // Horizontal lines
        char = step(0.3, charGrid.y) * step(charGrid.y, 0.7);
    } else if(h < 0.6) {
        // Cross pattern
        char = (step(0.4, charGrid.x) * step(charGrid.x, 0.6)) +
               (step(0.4, charGrid.y) * step(charGrid.y, 0.6));
    } else if(h < 0.8) {
        // Corner patterns
        char = step(0.6, charGrid.x + charGrid.y);
    } else {
        // Diagonal patterns
        char = step(0.1, abs(charGrid.x - charGrid.y));
    }

    return clamp(char, 0.0, 1.0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalize coordinates
    vec2 uv = fragCoord / iResolution.xy;

    // Create column grid based on density
    float columnWidth = 40.0 / u_density;
    vec2 grid = vec2(floor(uv.x * columnWidth), uv.y);

    // Time with speed control
    float time = iTime * u_speed;

    // Create vertical scrolling effect
    float scrollSpeed = 3.0;
    float scrollY = time * scrollSpeed;

    // Calculate character position in grid
    vec2 charPos = vec2(grid.x, floor((uv.y * iResolution.y / 15.0) + scrollY));

    // Create staggered column starts
    float columnOffset = hash(vec2(grid.x, 0.0)) * 10.0;
    charPos.y += columnOffset;

    // Generate character at this position
    float charSeed = hash(charPos) + floor(time * 2.0) * u_variation;
    float char = character(charPos * 3.0, charSeed);

    // Create trail effect - characters fade as they fall
    float trailLength = 15.0;
    float distFromHead = mod(charPos.y - scrollY, trailLength);
    float trailFade = 1.0 - smoothstep(0.0, trailLength, distFromHead);

    // Leading character is brightest
    float leadBrightness = smoothstep(2.0, 0.0, distFromHead);

    // Create random column heights and gaps
    float columnHash = hash(vec2(grid.x, floor(scrollY / 30.0)));
    float columnActive = step(0.1, columnHash);

    // Combine character visibility
    float visibility = char * trailFade * columnActive * u_brightness;

    // Matrix green (primary): #00FF6F = vec3(0.0, 1.0, 0.435)
    vec3 matrixGreen = vec3(0.0, 1.0, 0.435);

    // Adapt colors to use #00FF6F as matrix color
    // Lead character: bright #00FF6F (optionally slightly lighter)
    vec3 leadColor = matrixGreen * 1.2;
    leadColor = clamp(leadColor, 0.0, 1.0);

    // Trail: faded #00FF6F (darker)
    vec3 trailColor = matrixGreen * 0.7;

    // Background: very dark/tinted #00FF6F, add a subtle glow
    vec3 darkColor = matrixGreen * 0.18;

    // Mix trail color and dark color by trailFade
    vec3 charColor = mix(darkColor, trailColor, trailFade);
    // Overlay leading character highlight
    charColor = mix(charColor, leadColor, leadBrightness);

    // Apply character visibility
    vec3 finalColor = charColor * visibility;

    // Add subtle scanline effect
    float scanline = sin(uv.y * iResolution.y * 2.0) * 0.04 + 1.0;
    finalColor *= scanline;

    // Add overall matrixGreen tint to background
    finalColor += matrixGreen * 0.02 * u_greenIntensity;

    // Ensure colors stay in valid range
    finalColor = clamp(finalColor, 0.0, 1.0);

    fragColor = vec4(finalColor, 1.0);
}
`

export const MatrixShaders = forwardRef<HTMLDivElement, MatrixShadersProps>(
  (
    {
      className,
      speed = 1.0,
      density = 1.0,
      brightness = 1.0,
      greenIntensity = 1.0,
      variation = 1.0,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("w-full h-full", className)} ref={ref} {...(props)}>
        <Shader
          fs={fragmentShader}
          style={{ width: "100%", height: "100%" } as CSSStyleDeclaration}
          uniforms={{
            u_speed: { type: "1f", value: speed },
            u_density: { type: "1f", value: density },
            u_brightness: { type: "1f", value: brightness },
            u_greenIntensity: { type: "1f", value: greenIntensity },
            u_variation: { type: "1f", value: variation },
          }}
        />
      </div>
    )
  },
)

MatrixShaders.displayName = "MatrixShaders"

export default MatrixShaders
