const express = require('express');    // yahan endpoints fetch krke layenge notes jab user request karega
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');   // fetchuser middleware ko yahan bhi import kar liya
const Note = require('../models/Note');                  // note model ko bhi karlia
const { body, validationResult } = require('express-validator');     //input ko validate krne k liye 

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required          sabhi notes ko database se fetch karega ye route
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });       // user ki id middleware se mil gayi to id se hi ham sabhi notes ko fetch kar lenge
        res.json(notes)                                             // response me notes bhej denge
    } catch (error) {                                               //koi bhi internal error aye to dikha dena
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;         //middleware se detail nikalke title wagera me daal di

            // If there are errorsin entered notes from the user, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({                                  //jo bhi user se valid note mile along with details wo const me save kr diye
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()                   //yahan notes save kar diye

            res.json(savedNote)                                   // response me saved notes bhej diye

        } catch (error) {                          //error aane par message
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


    // ROUTE 3: update an existing Note using: PUT "/api/notes/updatenote". Login required
    router.put('/updatenote/:id', fetchuser, async (req, res)=>{
        const {title, description, tag} = req.body;
        //create a newnote object
        try{
        const newNote = {};                                 //new note naam ka object banaya hai abhi empty hai
        if(title){newNote.title=title};                           // agar title a rha hai as a part of request to object me add kardena
        if(description){newNote.description = description};        // just like title agar exist krta hai description to add krdena in object
        if(tag){newNote.tag = tag};

        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);              // user id se notes ko fetch karenge jise update krna hai
        if(!note){return res.status(404).send("Not found")}          //agar note hai hi nahi to ye bhejna hai

        if(note.user.toString() !== req.user.id){                    //if notes ki id /string nhi equal hai user ki id k to mtlb koi kisi aur ka note access kr rha hai
            return res.status(401).send("Not Found") 
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})        //jis user-id k jis particular notes ko update krne ko bola, use yahan update kar diya
        res.json({note});
        } catch (error) {                          //error aane par message
        console.error(error.message);
        res.status(500).send("Internal Server Error");
        }         
    })


    // ROUTE 4: delete an existing Note using: DELETE "/api/notes/deletenote". Login required
    router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
        const {title, description, tag} = req.body;
        try{
        //create a newnote object
        const newNote = {};                                 //new note naam ka object banaya hai abhi empty hai
        if(title){newNote.title=title};                           // agar title a rha hai as a part of request to object me add kardena
        if(description){newNote.description = description};        // just like title agar exist krta hai description to add krdena in object
        if(tag){newNote.tag = tag};

        //find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);              // user id se notes ko fetch karenge, so that use update kar sake
        if(!note){return res.status(404).send("Not found")}          //agar note hai hi nahi to ye error message bhejna hai
        
        // Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){                    //if notes ki id/string equal nhi hai user ki id k, to mtlb koi kisi aur ka note access kr rha hai
            return res.status(401).send("Not Found") 
        }

        note = await Note.findByIdAndDelete(req.params.id)        //jis user-id k jis particular note ko delete krne ko bola, use yahan delete kar diya
        res.json({"success": "note has been deleted"}); 
        } catch (error) {                          //error aane par message
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }          
    })
module.exports = router

