// This is where functions "login" and "signup"
// will interact with Supabase
const supabase = require('../config/supabaseConfig');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// default icon libraries to send to supabase on signup:
const defaultIcons = [
    "Ghost",
    "Alien",
    "UFO",
    "Bigfoot",
    "Cryptids",
    "Telekinesis",
]

const defaultIconsLibrary = [
    "WendigoStories",
    "Mothman",
    "Lochnessmonster",
    "Alienabduction",
    "Crawlersightings",
    "Cryptozoology",
    "Humanoidencounters"
]
// function to create a JWT with a given ID
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d'});
}

// login user
const loginUser = async (req, res) => {
    // get email and password from body from frontend
    const { email, password } = req.body;
    // check if email and password present
    if(!email || !password){
        res.json({error: "Please fill in all fields"})
        return
    }
    // validate username and password
    if(!validator.isEmail(email)){
        res.json({error: "Please use a valid email"})
        return
    }
    
    const exists = await supabase
        .from('cryptidusers')
        .select()
        .eq('email', email)

    // return if current email doesn't exist
    if(exists.data.length < 1){
        res.json({error: "This email is not registered. Please sign up."})
        return
    }

    const data = exists.data;
    const passwordMatch = await bcrypt.compare(password, data[0].password);

    if(passwordMatch){
        const token = createToken(data.id);
        res.json({ data, token })
    } else {
        res.json({ error: "Password incorrect"})
    }


}

// signup user
const signupUser = async (req, res) => {
    // get email and password from body from frontend
    const { email, password } = req.body;
    // check if both email and password provided
    if(!email || !password){
        res.json({ error: "Please fill in all fields"});
        return
    }
    // validate username and password
    if(!validator.isEmail(email)){
        res.json({ error: "Please use a valid email"});
        return
    }
    if(!validator.isStrongPassword(password)){
        res.json({ error: "Password is not strong enough"});
        return
    }
    // search for current email
    const exists = await supabase
        .from('cryptidusers')
        .select()
        .eq('email', email) // .eq stands for equals

    
    // return if current email exists in supabase
    if(exists.data.length > 0){
        res.json({ error: "This email is already registered."})
        return
    }
    // hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    // add new user to supabase
    const { data, error } = await supabase
        .from('cryptidusers')
        .insert([{ email, password: hashedPassword, usericons: defaultIcons, userlibrary: defaultIconsLibrary }])

        const token = createToken(data[0].id);

    if(error){
        console.log(error)
        res.json({ error: error.message});
    }
    if(data){
        res.json({data, token});
    }
}


// get user by id controller
const getUserById = async (req, res) => {

    const { id } = req.params;

    const user = await supabase
        .from('cryptidusers')
        .select()
        .eq('id', id)

    console.log(user);
    res.json(user.data);
}


// remove from library and add to icons
const addToIcons = async (req, res) => {

    try {
        // get email, icon name, and current icons from body
        const { email, iconName, currentIcons, currentLibrary } = req.body;

        // create a new array with new icon name in it
        currentIcons.push(iconName)
        console.log(currentIcons);

        // set the db icons to new icons array
        const addedIcon = await supabase
            .from('cryptidusers')
            .update({ usericons: currentIcons })
            .eq('email', email)

        // create a new array with new icon name deleted from it
        const newLibrary = currentLibrary.filter((i) => {
            return i !== iconName
        });

        console.log("New library to be added to db: ", newLibrary);

        // update library on db to array with new icon deleted from it
        const removedIcon = await supabase
            .from('cryptidusers')
            .update({ userlibrary: newLibrary })
            .eq('email', email)
        
            // success response
            res.json({ message: "Icons updated successfully"})
    } catch (error) {
        res.json({ error: "The icons could not be updated on the database"})
        console.log("There was an error: ", error.message)
    }
    
}


// delete from icons and add back to library
const removeFromIcons = async (req, res) => {

    try {
        // get email, icon name, and current icons from body
        const { email, iconName, currentIcons, currentLibrary } = req.body;

        // create a new array with new icon name removed from it
        const newIcons = currentIcons.filter((i) => {
            return i !== iconName;
        })

        // set the db icons to new icons array
        const removedIcon = await supabase
            .from('cryptidusers')
            .update({ usericons: newIcons })
            .eq('email', email)

        // create a new array with removed icon added to it (for library to add)
        currentLibrary.push(iconName);

        // update library on db to array with removed icon added to it
        const iconAddedToLibrary = await supabase
            .from('cryptidusers')
            .update({ userlibrary: currentLibrary })
            .eq('email', email)
        
            // success response
            res.json({ message: "Icons updated successfully"})
    } catch (error) {
        res.json({ error: "The icons could not be updated on the database"})
        console.log("There was an error: ", error.message)
    }

}


// update theme controller
const updateTheme = async (req, res) => {
    const { color, email } = req.body;

    console.log("Type of email variable: ", typeof email);

    if(!color){
        return res.json({error: "Something went wrong"})
    }

    const { data, error } = await supabase
        .from('cryptidusers')
        .update({ theme: color})
        .eq('email', email)

    if(error){
        return res.json({ error: "Could not update theme on database."})
    }

    res.json({ message: "Theme successfully updated on database"})
}

module.exports = { loginUser, signupUser, getUserById, updateTheme, addToIcons, removeFromIcons }