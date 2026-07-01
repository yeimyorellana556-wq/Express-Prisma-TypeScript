import { db } from '../src/utils/db.server';
import { hashPassword } from '../src/utils/bcryptHandler';
import { randomUUID } from 'crypto';

async function main() {
  // 1. Crear usuario de prueba
  const hashedPassword = await hashPassword('Password123');
  const user = await db.user.create({
    data: {
      id: randomUUID(),
      fullName: 'Yeimi Orellana',
      username: 'yeimi',
      email: 'yeimi@test.com',
      password: hashedPassword,
    },
  });
  console.log('Usuario creado:', user.username);

  // 2. Crear autor
  const author = await db.author.create({
    data: {
      firstName: 'Gabriel',
      lastName: 'Garcia Marquez',
    },
  });
  console.log('Autor creado:', author.id);

  // 3. Crear 3 libros
  const books = await db.book.createMany({
    data: [
      { title: 'Cien años de soledad', isFiction: true, datePublished: new Date('1967-05-30'), authorId: author.id },
      { title: 'El amor en los tiempos del cólera', isFiction: true, datePublished: new Date('1985-01-01'), authorId: author.id },
      { title: 'Crónica de una muerte anunciada', isFiction: true, datePublished: new Date('1981-01-01'), authorId: author.id },
    ],
  });
  console.log('Libros creados:', books.count);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await db.$disconnect());