// import dependancies in the  router files
const express=require('express');   
const router=express();        
const multer = require('multer'); 
const websiteControllers=require('../controllers/website_controllers');
const auth = require('../middleware/website_auth');

// create storage 
const storage=multer.diskStorage({   
    destination:"uploads",        
    filename:(req,file,cb)=>{    
        cb(null,file.originalname);   
    },   
}); 
  
const upload = multer({
    storage: storage, 
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" || 
        file.mimetype == "image/jpeg" 
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    } 
   }, 
   limits:{ 
 
    filesize:100000000000 //1000000 bytes=1MB  
   }    
});  
 
//api post  
router.post('/signup',websiteControllers.User_Signup); 
router.post('/verify_otp',websiteControllers.Verify_Otp); 
router.post('/resend_otp',websiteControllers.Resend_Otp);
router.post('/user_profile', websiteControllers.User_Profile); 
router.post('/update_user', upload.single('profile_image'), websiteControllers.Update_User);
router.post('/add_business_details',websiteControllers.Add_Business_Details);
router.post('/update_business_details',upload.any('business_image'),websiteControllers.Update_Business_Details);
router.post('/get_business_data',websiteControllers.Get_Business_Data); 
router.post('/get_business_details',websiteControllers.Get_Business_Details);
router.post('/add_product_details',upload.any('produt_image'),websiteControllers.Add_Product_Details);
router.post('/get_product_data',websiteControllers.Get_Product_Data);
router.post('/get_product_details',websiteControllers.Get_Product_Details);
router.post('/get_subcategory_list',websiteControllers.Get_SubCategory_List);
router.post('/product_status_update',websiteControllers.product_status_update);
router.post('/add_user_contact',websiteControllers.Add_User_Contact);

//api get
router.get('/get_business_list',websiteControllers.Get_Business_List); 
router.get('/get_product_list',websiteControllers.Get_Product_List);
router.get('/get_category_list',websiteControllers.Get_Category_List);
router.get('/get_contact_list',websiteControllers.Get_Contact_list);
router.get('/get_term_list',websiteControllers.Get_Term_list);
router.get('/get_faq_list',websiteControllers.Get_Faq_List);
router.get('/get_privacy_policy_list',websiteControllers.Get_Privacy_Policy_List);



router.put('/update_product_details',upload.any('produt_image'),websiteControllers.update_product_details);

module.exports=router;