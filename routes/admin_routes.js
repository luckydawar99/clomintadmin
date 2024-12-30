// import dependancies in the  router files
const express=require('express'); 
const router=express(); 
const multer = require('multer'); 
const adminControllers=require('../controllers/admin_controllers');
const auth = require('../middleware/admin_auth');

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
router.post('/login', adminControllers.Admin_Login);
router.post('/user_profile',adminControllers.User_Profile);
router.post('/add_category',upload.single('category_image'),adminControllers.Add_Category);
router.post('/add_subcategory',upload.single('subcategory_image'),adminControllers.Add_SubCategory);
// new data add
router.post('/add_membership',adminControllers.Add_membership);
router.post('/product_details',adminControllers.Product_details);
router.post('/get_product_user_data',adminControllers.Get_Product_User_Data);
router.post('/get_business_details',adminControllers.Get_Business_Details);
router.post('/vendor_listing_details',adminControllers.Vendor_Listing_Details);
router.post('/business_listing_details',adminControllers.Business_Listing_Details);
router.post('/add_contact',adminControllers.Add_Contact);
router.post('/add_terms',adminControllers.Add_Terms);
router.post('/add_faq',adminControllers.Add_Faq);
router.post('/add_privacy_policy',adminControllers.Add_Privacy_Policy);

//api update
router.post('/update_category',auth,upload.single('category_image'),adminControllers.Update_Category);
router.post('/update_subcategory',upload.single('subcategory_image'),adminControllers.Update_SubCategory);
router.post('/vendor_status_update',adminControllers.Vendor_Status_Update);
router.post('/update_product_status',adminControllers.Update_Product_Status);
router.post('/update_contact',adminControllers.Update_Contact);
router.post('/update_terms',adminControllers.Update_Terms);
router.post('/update_category_status',adminControllers.Update_Category_Status);
router.post('/update_subcategory_status',adminControllers.Update_SubCategory_Status);

//api get
router.get('/user_list',adminControllers.User_List);
router.get('/vendor_list',adminControllers.Vendor_List);
router.get('/product_list',adminControllers.Product_List);
router.get('/category_list',adminControllers.Category_List);
router.get('/subcategory_list',adminControllers.SubCategory_List);
router.get('/get_business_list',adminControllers.Get_Business_list);
router.get('/get_membership_list',adminControllers.Get_membership_list);
router.get('/get_contact_list',adminControllers.Get_Contact_list);
router.get('/get_contactuser_list',adminControllers.Get_Contactuser_list);
router.get('/get_term_list',adminControllers.Get_Term_list);
router.get('/get_faq_list',adminControllers.Get_Faq_List);
router.get('/get_privacy_policy',adminControllers.Get_Privacy_Policy);

//api delete
router.get('/delete_category/:id', adminControllers.Delete_Category);
router.get('/delete_subcategory/:id', adminControllers.Delete_SubCategory);

module.exports=router;