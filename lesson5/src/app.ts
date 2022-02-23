import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    // const users = await getManager().getRepository(User).findOne({
    //     where: {
    //         firstName: 'Olena',
    //     },
    // });
    // const users = await getManager().getRepository(User).findOne();
    // console.log(users);
    // res.json(users);
    // const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    // res.json(users);
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .where('user.firstName = "Jaha"')
    //     .getOne();
    //
    // console.log(users);
    // res.json(users);
    const users = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        .where('posts.text = "asdas"')
        .getMany();
    res.json(users);
});

app.post('/users', async (req, res) => {
    console.log(req.body);
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
});

// app.delete('/users/:id', async (req, res) => {
//     console.log(req.body);
//     const createdUser = await getManager()
//         .getRepository(User)
//         .delete({ id: Number(req.params.id) });
//     res.json(createdUser);
// });

app.delete('/users/:id', async (req, res) => {
    const createdUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(createdUser);
});

app.listen(5500, async () => {
    console.log('Server has started🚀🚀🚀');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
