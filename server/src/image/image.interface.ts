export type ExpressFIle = Pick<
    Express.Multer.File,
    "originalname" | "mimetype" | "buffer" | "size"
>;
