const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const userModel = require('../models/user_models');
const businessModel = require('../models/business_models');
const productModel = require('../models/product_models');
const categoryModel = require('../models/category_models');
const subcategoryModel = require('../models/subcategory_models');
const contactModel = require("../models/contactus_models");
const contactuserModel = require("../models/contactusers_models");
const termModel = require("../models/terms_models");
const privacypolicyModel = require("../models/privacy_policy");

const faqModel = require("../models/faq_models");

const JWT_SECRET_KEY = 'gfg_jwt_secret_key';
const TOKEN_KEY = 'gfg_token_header_key';

//create user login api  
const User_Signup = async (req, res) => {
    const { mobile_no, user_type } = req.body;
    try {
        if (mobile_no && user_type) {

            const user = await userModel.findOne({ mobile_no: mobile_no });

            if (user) {
                const user_status = await userModel.findOne({ mobile_no: mobile_no, 'user_active_status': '0' });
                if (user_status) {
                    const _id = user._id
                    const otp = Math.floor(1000 + Math.random() * 9000);
                    const token = jwt.sign({ _id: user._id, mobile_no }, TOKEN_KEY, { expiresIn: "1h", });
                    const user_data = await userModel.findByIdAndUpdate({ _id: _id }, { $set: { otp, token, } }, { new: true });
                    res.status(200).json({
                        result: 'true',
                        msg: 'otp send successfully please verify',
                        data: {
                            userId: user_data._id,
                            mobile_no: user_data.mobile_no,
                            otp: user_data.otp,
                            user_type: user_data.user_type,
                            token: user_data.token
                        }
                    });
                } else {
                    res.status(400).json({
                        result: 'false',
                        msg: 'agent blocked by admin..',
                    });
                }
            } else {

                const otp = Math.floor(1000 + Math.random() * 9000);
                const user_register = new userModel({ mobile_no, otp, user_type, user_status: '0' });
                const token = jwt.sign({ _id: user_register._id, mobile_no }, TOKEN_KEY, { expiresIn: "1h", });
                user_register.token = token;
                const user_data = await user_register.save();

                res.status(200).json({
                    result: 'true',
                    msg: 'otp send successfully please verify..',
                    data: {
                        userId: user_data._id,
                        mobile_no: user_data.mobile_no,
                        otp: user_data.otp,
                        user_type: user_data.user_type,
                        token: user_data.token
                    }
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required mobile_no & user_type..'
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};


//create verify otp api 
const Verify_Otp = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        if (userId && otp) {

            if (mongoose.Types.ObjectId.isValid(userId)) {

                const user_data = await userModel.findOne({ _id: userId, otp: otp });

                if (user_data) {
                    res.status(200).json({
                        result: 'true',
                        msg: 'otp verify successfully..',
                        data: {
                            userId: user_data._id,
                            mobile_no: user_data.mobile_no,
                            otp: user_data.otp,
                            user_type: user_data.user_type,
                            token: user_data.token
                        }
                    });
                } else {
                    res.status(400).json({
                        result: 'false',
                        msg: 'invalid otp please enter valid otp..'
                    });
                }
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: 'Invalid ObjectId for userId parameter..'
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required userId & otp..'
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};


//create resend otp api
const Resend_Otp = async (req, res) => {
    const { mobile_no } = req.body;

    try {
        if (mobile_no) {
            const user = await userModel.findOne({ mobile_no: mobile_no });

            if (user) {
                const _id = user._id
                const otp = Math.floor(1000 + Math.random() * 9000);
                const user_data = await userModel.findByIdAndUpdate({ _id: _id }, { $set: { otp } }, { new: true });
                res.status(200).json({
                    result: 'true',
                    msg: 'otp resend successfully please verify..',
                    data: {
                        userId: user_data._id,
                        mobile_no: user_data.mobile_no,
                        otp: user_data.otp,
                        user_type: user_data.user_type,
                        token: user_data.token
                    }
                });
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: 'mobile_no does not exist, please enter register mobile_no..'
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required mobile_no..'
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create user Profile get api 
const User_Profile = async (req, res) => {
    try {
        const { userId } = req.body;
        if (userId) {
            const user_data = await userModel.findById({ _id: userId });
            if (user_data) {
                res.status(200).json({
                    result: 'true',
                    msg: 'user Data get successfully..',
                    data: user_data
                });
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: 'record not found..',
                })
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required userId..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create user data update api  
const Update_User = async (req, res) => {
    try {
        const { userId, first_name, last_name, company_name, address, city_name, state, country, post_code, website, phone_no, date_of_birth } = req.body;

        if (userId) {

            const user_data = await userModel.findById({ _id: userId });

            if (user_data) {

                const updateFields = {}; // Create an object to store the fields to be updated
                if (first_name) updateFields.first_name = first_name;
                if (last_name) updateFields.last_name = last_name;
                if (company_name) updateFields.company_name = company_name;
                if (address) updateFields.address = address;
                if (city_name) updateFields.city_name = city_name;
                if (state) updateFields.state = state;
                if (country) updateFields.country = country;
                if (post_code) updateFields.post_code = post_code;
                if (website) updateFields.website = website;
                if (phone_no) updateFields.phone_no = phone_no;
                if (date_of_birth) updateFields.date_of_birth = date_of_birth;


                // Process profile_image if files are uploaded
                if (req.file) {
                    updateFields.profile_image = req.file.filename;
                }

                // Use $set to update only the specified fields
                const updatedUserData = await userModel.findOneAndUpdate(
                    { _id: userId },
                    { $set: updateFields },
                    { new: true }
                );
                res.status(200).json({
                    result: 'true',
                    msg: 'user data update successfully..',
                    data: updatedUserData
                })
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: 'userId does not exist..',
                })
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required userId, (optional parameter) first_name,last_name,company_name,address,city_name,state,country,post_code,website,phone_no,date_of_birth & profile_image..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create add business details api
const Add_Business_Details = async (req, res) => {
    const { userId, business_name, pincode, building_name, colony_name, area, landmark, city, state, } = req.body;
    try {
        if (userId) {

            const user = await userModel.findById({ _id: userId });

            if (user) {

                const business_register = new businessModel({
                    userId, business_name, pincode, building_name, colony_name, area, landmark, city, state
                });
                const business_data = await business_register.save();

                res.status(200).json({
                    result: 'true',
                    msg: 'business data add successfully..',
                    data: business_data,
                })
            } else {
                res.status(400).json({
                    result: 'true',
                    msg: 'userId does not exist..',
                })
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required userId,business_name,pincode,building_name,colony_name,area,landmark & city,state..'
            });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            result: 'false',
            msg: error.message,
        })
    }
};

//create bussiness data update api  
const Update_Business_Details = async (req, res) => {
    try {
        const { businessId, person_name, mobile_no, whatsapp_no, landline_no, business_timing, open_time, close_time, business_category } = req.body;

        // Check if businessId is provided
        if (!businessId) {
            return res.status(400).json({
                result: 'false',
                msg: 'Parameter required: businessId. Optional parameters: person_name, mobile_no, whatsapp_no, landline_no, business_timing, open_time, close_time, business_category, and business_image.'
            });
        }

        // Fetch the business data
        const user_data = await businessModel.findById(businessId);

        if (!user_data) {
            return res.status(400).json({
                result: 'false',
                msg: 'BusinessId does not exist.'
            });
        }

        // Prepare fields to update
        const updateFields = {};

        if (person_name) updateFields.person_name = person_name;
        if (mobile_no) updateFields.mobile_no = mobile_no;
        if (whatsapp_no) updateFields.whatsapp_no = whatsapp_no;
        if (landline_no) updateFields.landline_no = landline_no;
        if (open_time) updateFields.open_time = open_time;
        if (close_time) updateFields.close_time = close_time;
        if (business_category) updateFields.business_category = business_category;

        // Process business_timing if provided
        if (business_timing) {
            updateFields.business_timing = business_timing.split(',');
        }

        // Process business_image if files are uploaded
        if (req.files && req.files.length > 0) {
            updateFields.business_image = req.files.map(file => file.filename);
        }

        // Update the business details in the database
        const updatedUserData = await businessModel.findByIdAndUpdate(
            businessId,
            { $set: updateFields },
            { new: true } // Return the updated document
        );

        // Send success response
        res.status(200).json({
            result: 'true',
            msg: 'User data updated successfully.',
            data: updatedUserData
        });
    } catch (error) {
        console.error('Error updating business details:', error.message);
        res.status(500).json({
            result: 'false',
            msg: 'An error occurred while updating business details.',
            error: error.message
        });
    }
};

//create get bussiness data api 
const Get_Business_Data = async (req, res) => {
    try {
        const { userId } = req.body;
        if (userId) {
            const result = await businessModel.find({ userId: userId });
            if (!result || result.length == 0) {
                res.status(400).json({
                    result: 'false',
                    msg: 'record not found..',
                })
            } else {
                res.status(200).json({
                    result: 'true',
                    msg: 'business data get successfully..',
                    data: result
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required userId..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create get bussiness List api 
const Get_Business_List = async (req, res) => {
    try {
        const result = await businessModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..',
            })
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'business list get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create get bussiness data api 
const Get_Business_Details = async (req, res) => {
    try {
        const { businessId } = req.body;
        if (businessId) {
            const result = await businessModel.findById({ _id: businessId });
            if (!result) {
                res.status(400).json({
                    result: 'false',
                    msg: 'record not found..',
                })
            } else {
                res.status(200).json({
                    result: 'true',
                    msg: 'business data get successfully..',
                    data: result
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required businessId..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create add business details api
const Add_Product_Details = async (req, res) => {
    const { userId, product_title, add_type, price, add_category, product_condition, address, description } = req.body;
    try {
        if (userId) {

            const user = await userModel.findById({ _id: userId });

            if (user) {
                // Process product images
                const arrayImage = req.files.map((img) => img.filename);

                const product_register = new productModel({
                    userId, product_title, add_type, price, add_category, product_condition, address, description, product_image: arrayImage
                });
                const product_data = await product_register.save();

                res.status(200).json({
                    result: 'true',
                    msg: 'product data add successfully..',
                    data: product_data,
                })
            } else {
                res.status(400).json({
                    result: 'true',
                    msg: 'userId does not exist..',
                })
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required userId,product_title,add_type,price,add_category,product_condition, address,description & produt_image..'
            });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            result: 'false',
            msg: error.message,
        })
    }
};

//create get product data api 
const Get_Product_Data = async (req, res) => {
    try {
        const { userId } = req.body;
        if (userId) {
            const result = await productModel.find({ userId: userId });
            if (!result || result.length == 0) {
                res.status(400).json({
                    result: 'false',
                    msg: 'record not found..',
                })
            } else {
                res.status(200).json({
                    result: 'true',
                    msg: 'product data get successfully..',
                    data: result
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required userId..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create get product List api 
const Get_Product_List = async (req, res) => {
    try {
        const result = await productModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..',
            })
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'product list get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create get product details api 
const Get_Product_Details = async (req, res) => {
    try {
        const { productId } = req.body;
        if (productId) {
            const result = await productModel.findById({ _id: productId }).populate('userId');
            if (!result) {
                res.status(400).json({
                    result: 'false',
                    msg: 'record not found..',
                })
            } else {
                const data = {
                    _id: result_id,
                    userId: result.userId._id,
                    mobile_no: result.userId.mobile_no,
                    first_name: result.userId.first_name,
                    profile_image: result.userId.profile_image,
                    user_address: result.userId.address,
                    product_title: result.product_title,
                    product_image: result.product_image,
                    add_type: result.add_type,
                    price: result.price,
                    add_category: result.add_category,
                    product_condition: result.product_condition,
                    address: result.address,
                    product_status: result.product_status,
                    product_rating: result.product_rating,
                    createdAt: result.createdAt
                };
                res.status(200).json({
                    result: 'true',
                    msg: 'product data get successfully..',
                    data: data
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required productId..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create get category List api 
const Get_Category_List = async (req, res) => {
    try {
        const result = await categoryModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..',
            })
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'category data get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create get subcategory List api 
const Get_SubCategory_List = async (req, res) => {
    const { categoryId } = req.body;
    try {
        if (categoryId) {
            const result = await subcategoryModel.find({ categoryId: categoryId });
            if (!result || result.length == 0) {
                res.status(400).json({
                    result: 'false',
                    msg: 'record not found..',
                })
            } else {
                res.status(200).json({
                    result: 'true',
                    msg: 'category data get successfully..',
                    data: result
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required categoryId..',
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};
const update_product_details = async (req, res) => {
    try {
        const { _id, salary_period, position_type, salary_from, salary_to, ad_title, description, price, post_type, post_bhk, bathrooms, furnishing, project_status,
            listing_by, super_area_sqft, carpet_area_sqft, bachelors_allowed, maintenance_monthly, total_floors, floor_number, car_parking, facing, project_name, washrooms, plot_area, length, breadth, sub_typemeals_included } = req.body;
        // userId,categoryId,subcategoryId,
        // Check if _id is provided
        if (!_id) {
            return res.status(400).json({ result: 'false', msg: 'Parameter required: _id ' });
        }

        // Fetch the product data
        const product_data = await productModel.findById({ _id });
        // console.log(product_data);
        if (!product_data) {
            return res.status(400).json({ result: 'false', msg: '_id does not exist.' });
        }

        // Prepare fields to update
        const updateFields = {};

        if (salary_period) updateFields.salary_period = salary_period;
        if (position_type) updateFields.position_type = position_type;
        if (salary_from) updateFields.salary_from = salary_from;
        if (salary_to) updateFields.salary_to = salary_to;
        if (ad_title) updateFields.ad_title = ad_title;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (post_type) updateFields.post_type = post_type;
        if (post_bhk) updateFields.post_bhk = post_bhk;
        if (bathrooms) updateFields.bathrooms = bathrooms;
        if (furnishing) updateFields.furnishing = furnishing;
        if (project_status) updateFields.project_status = project_status;
        if (listing_by) updateFields.listing_by = listing_by;
        if (super_area_sqft) updateFields.super_area_sqft = super_area_sqft;
        if (carpet_area_sqft) updateFields.carpet_area_sqft = carpet_area_sqft;
        if (bachelors_allowed) updateFields.bachelors_allowed = bachelors_allowed;
        if (maintenance_monthly) updateFields.maintenance_monthly = maintenance_monthly;
        if (total_floors) updateFields.total_floors = total_floors;
        if (floor_number) updateFields.floor_number = floor_number;
        if (car_parking) updateFields.car_parking = car_parking;
        if (facing) updateFields.facing = facing;
        if (project_name) updateFields.project_name = project_name;
        if (washrooms) updateFields.washrooms = washrooms;
        if (plot_area) updateFields.plot_area = plot_area;
        if (length) updateFields.length = length;
        if (breadth) updateFields.breadth = breadth;
        if (sub_typemeals_included) updateFields.sub_typemeals_included = sub_typemeals_included;
        // Process product_image if files are uploaded
        if (req.files && req.files.length > 0) {
            updateFields.produt_image = req.files.map(file => file.filename);
        }
        // Update the business details in the database
        const updatedUserData = await productModel.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true } // Return the updated document
        );
        // Send success response
        res.status(200).json({
            result: 'true', msg: 'product data updated successfully.', data: updatedUserData
        });
    } catch (error) {
        res.status(400).json({ result: 'false', msg: 'An error occurred while updating product details.', error: error.message });
    }
}
const product_status_update = async (req, res) => {
    try {
        const { productId,product_status } = req.body;
        if (!productId) {
            return res.status(400).json({ result: "false", message: "productId field is required" });
        }
        // console.log(productId)
        const product_data = await productModel.findById(productId);
        
        if (product_data.length === 0){
            return res.status(400).json({ result: 'false', msg: 'productId does not exist.' });
        }
        console.log("updatestatusfield",product_data);

        // if (product_status) updatestatusfield.product_status = 1;
        const updatedUserData = await productModel.findByIdAndUpdate(
            productId,
            {product_status},
            { new: true } 
        );
        console.log("updatestatusfield",updatedUserData);
        res.status(200).json({result:"false",message:"status update successfylly",data:updatedUserData})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ resule: "false", message: error.message })
    }
}


//create contact list api website
const Get_Contact_list = async (req, res) => {
    try {
        const result = await contactModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({ result: 'false', msg: 'record not found..', })
        } else {
            res.status(200).json({ result: 'true', msg: 'contact list data get successfully..', data: result });
        }
    } catch (error) {
        res.status(400).json({ resule: "false", msg: error.message })
    }
}
// create add contact user api website
const Add_User_Contact = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ result: "false", msg: "parameter required: name,  email, subject, message..." })
            }
            const contact_add = new contactuserModel({ name, email, subject, message });
            const contact_data = await contact_add.save();

            res.status(200).json({ result: 'true', msg: 'contact data add successfully..' });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", message: error.message });
    }
};

// creact get term list api website
const Get_Term_list = async (req, res) => {
    try {
        const result = await termModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({ result: 'false', msg: 'record not found..', })
        } else {
            res.status(200).json({ result: 'true', msg: 'terms list data get successfully..', data: result });
        }
    } catch (error) {
        res.status(400).json({ resule: "false", msg: error.message })
    }
}

// create get fa1 list api website
const Get_Faq_List = async (req, res) => {
    try {
        const result = await faqModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({ result: 'false', msg: 'record not found..', })
        } else {
            res.status(200).json({ result: 'true', msg: 'terms list data get successfully..', data: result });
        }
    } catch (error) {
        res.status(400).json({ resule: "false", msg: error.message })
    }
}

// create get privacy policy list api website
const Get_Privacy_Policy_List = async (req, res) => {
    try {
        const result = await privacypolicyModel.findOne({});
        if (!result || result.length == 0) {
            res.status(400).json({ result: 'false', msg: 'record not found..', })
        } else {
            res.status(200).json({ result: 'true', msg: 'terms list data get successfully..', data: result });
        }
    } catch (error) {
        res.status(400).json({ resule: "false", msg: error.message })
    }
}
module.exports = {
    User_Signup,
    Verify_Otp,
    Resend_Otp,
    User_Profile,
    Update_User,
    Add_Business_Details,
    Update_Business_Details,
    Get_Business_Data,
    Get_Business_List,
    Get_Business_Details,
    Add_Product_Details,
    Get_Product_Data,
    Get_Product_List,
    Get_Product_Details,
    Get_Category_List,
    Get_SubCategory_List,

    update_product_details,
    product_status_update,
    Get_Contact_list,
    Add_User_Contact,
    Get_Term_list,
    Get_Faq_List,
    Get_Privacy_Policy_List,
}  