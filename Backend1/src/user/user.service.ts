import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async getUsers() {
       const users = await this.prisma.user.findMany({
              select: {
                id: true,
                name: true,
                email: true,
              }
       });
         return users;
    }
    async getUser({ userId } : { userId: string }) {
        const users = await this.prisma.user.findUnique({
               where: {
                    id: userId,
                },
                select: {
                  id: true,
                  name: true,
                  email: true,
                  profilePictureUrl: true,
                }
        });
          return users;
     }

     async getUserByEmail({ userEmail } : { userEmail: string }) {
        const users = await this.prisma.user.findUnique({
               where: {
                    email: userEmail,
                },
                select: {
                  id: true,
                  name: true,
                  email: true,
                  profilePictureUrl: true,
                }
        });
          return users;
     }
}
 