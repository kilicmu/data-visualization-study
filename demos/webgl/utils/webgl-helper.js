export const $ = s => document.querySelector(s)

export const getContext = (canvas) => canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if(success) {
        return shader
    }

    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

export function resizeCanvas(canvas, width, height) {
    width = width || window.innerWidth
    height = height || window.innerHeight
    if(canvas.width !== width) {
        canvas.width = width
    }
    if(canvas.height !== height) {
        canvas.height = height
    }
}

/**
 * 
 * @param {*} gl webgl context 
 * @param {*} type 着色器类型
 * @param {*} str 源码
 */
export function createShaderFromScript(gl, type, id) {
    return createShader(gl, type, $(id).innerHTML)
}



export function createProgram(gl, ...shaders) {
    const program = gl.createProgram()
    shaders.forEach((shader) => {
        gl.attachShader(program, shader)
    })
    gl.linkProgram(program)

    const result = gl.getProgramParameter(program, gl.LINK_STATUS)
    if(result) {
        console.log('create program successfully!')
        // const uniformSetters = createUniformSetters(gl, program)
        // const attributeSetters = createAttributeSetters(gl, program)
        return {
            program,
            // uniformSetters,
            // attributeSetters
        }
    }

    const errorLog = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw errorLog
}


const random = Math.random;
export function randomColor() {
  return {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: random() * 1
  };
}


export function createBuffer(gl, attribute, vertexAttribPointer) {
    const {
        size = 0,
        type = gl.FLOAT,
        normalize = false,
        stride = 0,
        offset = 0
    } = vertexAttribPointer
    gl.enableVertexAttribArray(attribute)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(attribute, size, type, normalize, stride, offset)
    return buffer
}