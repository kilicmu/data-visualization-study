async function fn1() {
    console.log(1)
    await new Promise((res) => setTimeout(res, 4000))
    console.log(2)
}

async function fn2() {
    console.log(3)
    await new Promise((res) => setTimeout(res, 2000))
    console.log(4)
}

