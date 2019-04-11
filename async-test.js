let list = []
async function a () {
  await sleep()
}

function sleep () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('zou')
      resolve()
    }, 500)
  })
}

for (let index = 0; index < 4; index++) {
  list.push(a)
}

async function dispatch (index) {
  await list[index]()
  await dispatch(index + 1)
}
dispatch(0)
