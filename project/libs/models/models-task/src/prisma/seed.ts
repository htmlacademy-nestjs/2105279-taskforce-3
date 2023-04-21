import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.task.upsert({
    where: { taskId: 1 },
    update: {},
    create: {
      title: 'Доставка',
      details: 'Из пункта А в пункт Б',
      price: 300,
      address: 'Пункты А и Б',
      city: 'Санкт-Петербург',
      customerId: '22',
      executerId: '115',
      status: 'new',
      category: {
        create: {
          name: 'доставка',
        }
      },
      comments: {
        create: [{
          message: 'Несколько лет назад...',
          userId: '21',
        },
        {
          message: 'Да, я помню.',
          userId: '117',
        }]
      },
      tags: {
        create: [{
          name: 'доставка',
        }, {
          name: 'быстро',
        }, {
          name: 'доступно',
        },
        ]
      },
      review: {
        create: {
          review: 'В последний момент',
          evaluation: 4
        }
      }
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
