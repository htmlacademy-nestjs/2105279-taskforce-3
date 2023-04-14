import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {

  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      name: 'Доставка',
    }
  });

  await prisma.city.upsert({
    where: { cityId: 1 },
    update: {},
    create: {
      name: 'Санкт-Петербург',
    }
  });

  await prisma.status.upsert({
    where: { statusId: 1 },
    update: {},
    create: {
      name: 'new',
    }
  });

  await prisma.tag.upsert({
    where: { tagId: 1 },
    update: {},
    create: {
      name: 'доставка',
    }
  });

  await prisma.task.upsert({
    where: { taskId: 1 },
    update: {},
    create: {
      title: 'Доставка',
      details: 'Из пункта А в пункт Б',
      categoryId: 1,
      price: 300,
      address: 'Пункты А и Б',
      cityId: 1,
      customerId: '22',
      executerId: '115',
      statusId: 1
    }
  });

  await prisma.comment.upsert({
    where: { commentId: 1 },
    update: {},
    create: {
      message: 'Несколько лет назад...',
      userId: '22',
      taskId: 1
    }
  });

  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
