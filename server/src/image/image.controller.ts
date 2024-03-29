import {
    Controller,
    Get,
    Post,
    Param,
    Res,
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common";
import { ImageRepository } from "./image.repository";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("image")
export class ImageController {
    constructor(private readonly imageRepository: ImageRepository) {}

    @Get("raw/:id")
    async findOne(@Param("id") id: string) {
        return await this.imageRepository.get(id);
    }

    @Get("buffer/:id")
    async test(@Param("id") id: string, @Res() res: Response) {
        const imgres = await this.imageRepository.get(id);
        if (!imgres) return;
        const buff = Buffer.from(imgres.buffer);
        return res.send(buff);
    }

    @Get("allid")
    async getAllID(): Promise<string[]> {
        return (await this.imageRepository.getMany()).map((e) => {
            return e.id;
        });
    }

    @Post("update/:id")
    @UseInterceptors(FileInterceptor("file"))
    async updateImage(@UploadedFile() file: Express.Multer.File, @Param("id") id: string) {
        const { originalname, mimetype, buffer, size } = file;
        const res_img = await this.imageRepository.update(id, {
            originalname,
            mimetype,
            buffer,
            size,
        });

        return res_img !== null;
    }
}
