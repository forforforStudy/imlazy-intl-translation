# imlazy-intl-translation
json文件自动机翻

## Usage

### npm 安装

```
npm i imlazy-intl-translation
```

### Cli使用

cli的脚本使用于json文件的自动翻译；第一个参数为输入的文件地址，第二个为输出的文件地址

```
npx imlazy-intl-translation ./input.json ./output.json
```

### 脚本使用

```typescript
import { 
  translate,
  translateObject,
  translateJSONFile
} from 'imlazy-intl-translation'

/**
 * 翻译单个中文文本
 */
translate('中文').then(result => console.log(result)) // 'Chinese'

/**
 * 翻译对象
 */
translateObject({
  'label.chinese': '中文',
  'label.tip': '提示'
}).then(result => console.log(result)) // { 'label.chinese': 'Chinese', 'label.tip': 'Tip' }

/**
 * 翻译文件
 */
translateJSONFile(
  './zh-CN.json',
  './output/en-US.json'
)
```