declare module '*.svg' {
  const path: string
  export default path
}

declare module '*.bmp' {
  const path: string
  export default path
}

declare module '*.gif' {
  const path: string
  export default path
}

declare module '*.jpg' {
  const path: string
  export default path
}

declare module '*.jpeg' {
  const path: string
  export default path
}

declare module '*.png' {
  const path: string
  export default path
}

// 这是 TypeScript 中的模块声明语法，用于告诉编译器如何处理导入的模块。这段代码定义了针对几种图片格式的模块声明，可以让 TypeScript 编译器正确地识别这些模块，并将它们作为字符串导出。

// 每个模块声明都包含一个 declare module 语句，后面跟着模块名称，如 '*.svg'。这里的星号代表通配符，可以匹配任意字符串。然后使用 const 关键字定义一个变量，用于存储模块的路径，最后通过 export default 将该变量导出为默认值。

// 这些模块声明用于处理在 TypeScript 项目中导入图片的情况，当你使用 import 语句导入一个图片文件时，TypeScript 编译器会自动匹配对应的模块声明，然后将图片路径作为字符串导入到你的代码中。
