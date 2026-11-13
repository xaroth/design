// Turns each src/favicon/<name>.svg into <name>.svg, <name>.ico (16, 32 and 48 px) and <name>-180.png (touch icon).
import { Resvg } from '@resvg/resvg-js'
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const icoSizes = [16, 32, 48]
const touchSize = 180

const render = (svg: string, size: number) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()

// ICO with PNG entries: a 6-byte header, a 16-byte directory entry per image, then the images.
const ico = (images: { size: number; png: Buffer }[]) => {
  const header = Buffer.alloc(6 + 16 * images.length)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach(({ size, png }, i) => {
    const entry = 6 + 16 * i
    header.writeUInt8(size, entry)
    header.writeUInt8(size, entry + 1)
    header.writeUInt16LE(1, entry + 4)
    header.writeUInt16LE(32, entry + 6)
    header.writeUInt32LE(png.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += png.length
  })
  return Buffer.concat([header, ...images.map((i) => i.png)])
}

export const buildFavicons = async (src: string, out: string) => {
  await mkdir(out, { recursive: true })
  for (const file of await readdir(src)) {
    if (!file.endsWith('.svg')) {
      continue
    }
    const name = file.slice(0, -'.svg'.length)
    const svg = await readFile(join(src, file), 'utf8')
    await copyFile(join(src, file), join(out, file))
    await writeFile(join(out, `${name}.ico`), ico(icoSizes.map((size) => ({ size, png: render(svg, size) }))))
    await writeFile(join(out, `${name}-${touchSize}.png`), render(svg, touchSize))
  }
}
