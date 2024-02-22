import { Module } from "@nestjs/common";
import { ImageRepository } from "./image.repository";
import { ImageController } from "./image.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ImageController],
    providers: [ImageRepository],
    exports: [ImageRepository],
})
export class ImageModule {}
