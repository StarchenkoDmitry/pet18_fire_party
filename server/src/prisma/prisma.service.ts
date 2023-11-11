import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(){
    super()
    console.log("constructor PrismaService")
  }
  async onModuleInit() {
    // console.log("PrismaService onModuleInit")
    await this.$connect()
  }
}
