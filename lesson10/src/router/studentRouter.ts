import { Router } from 'express';

import { studentModel } from '../models/student';
// import { teacherModel } from '../models/teacher';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const createdStudent = await studentModel.create(req.body);

    res.json(createdStudent);
  } catch (e) {
    next(e);
  }
});


router.get('/', async (req, res, next) => {
  try {
    let stundets = await studentModel.find({}).populate('teacher');
    // await teacherModel.create({
    //  name: 'Viktro',
    //  age: 26,
    //  email: 'ViktroKmin@gmail.com    '
    // })

    console.log(stundets);

    res.json(stundets);
  } catch (e) {
    next(e);
  }
});

router.patch('/:stident_id', async (req, res, next) => {
  try {
    const updatedStdent = await studentModel.findByIdAndUpdate(
      req.params.stident_id,
      { teacher: "62546be0300a318f83d698f8" },
      { new: true }
    );

    res.json(updatedStdent)
  } catch (e) {
    next(e);
  }
});

export const studentRouter = router;
