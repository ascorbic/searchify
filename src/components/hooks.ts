import {
  getImageData,
  IGatsbyImageHelperArgs,
  IGetImageDataArgs,
  IImage,
} from "gatsby-plugin-image";

export function getShopifyImage(
  args: Omit<IGetImageDataArgs, "urlBuilder" | "baseUrl"> & {
    image: { originalSrc: string; width: number; height: number };
  }
) {
  const {
    originalSrc: baseUrl,
    width: sourceWidth,
    height: sourceHeight,
  } = args.image;

  const urlBuilder: IGetImageDataArgs["urlBuilder"] = ({
    width,
    height,
    baseUrl,
    format,
  }): string => {
    let [basename, version] = baseUrl.split("?");

    const dot = basename.lastIndexOf(".");
    let ext = "";
    if (dot !== -1) {
      ext = basename.slice(dot + 1);
      basename = basename.slice(0, dot);
    }
    let suffix = "";
    if (format === ext || format === "auto") {
      suffix = `.${ext}`;
    } else {
      suffix = `.${ext}.${format}`;
    }

    return `${basename}_${width}x${height}_crop_center${suffix}?${version}`;
  };

  return getImageData({
    ...args,
    baseUrl,
    sourceWidth,
    sourceHeight,
    urlBuilder,
    formats: ["auto", "webp"],
  });
}
