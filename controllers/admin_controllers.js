const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const adminModel = require('../models/admin_models');
const userModel = require('../models/user_models');
const productModel = require('../models/product_models');
const businessModel = require('../models/business_models');
const categoryModel = require('../models/category_models');
const subcategoryModel = require('../models/subcategory_models');
const membershipModel = require("../models/membership_models");
const contactModel = require("../models/contactus_models");
const contactuserModel = require("../models/contactusers_models");
const termModel = require("../models/terms_models");
const faqModel = require("../models/faq_models");
const privacypolicyModel = require("../models/privacy_policy");
const JWT_SECRET_KEY = 'gfg_jwt_secret_key';
const TOKEN_KEY = 'gfg_token_header_key';

//create admin login api      
const Admin_Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            const admin = await adminModel.findOne({ email: email, password: password });

            if (admin) {
                const _id = admin._id
                const token = jwt.sign({ _id: admin._id, email }, TOKEN_KEY, { expiresIn: "1h", });
                const admin_data = await adminModel.findByIdAndUpdate({ _id: _id }, { $set: { token } }, { new: true });

                res.status(200).json({
                    result: 'true',
                    msg: 'admin login successfully..',
                    data: {
                        adminId: admin_data._id,
                        email: admin_data.email,
                        token: admin_data.token
                    }
                });
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: 'invalid email & password..',
                });
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required email & password..'
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create user list api  
const User_List = async (req, res) => {
    try {
        const result = await userModel.find({ user_type: 'user' });
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..'
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'user data get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create vendor list api  
const Vendor_List = async (req, res) => {
    try {
        const result = await userModel.find({ user_type: 'vendor' });
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..'
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'vendor data get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create user profile get api 
const User_Profile = async (req, res) => {
    try {
        const { userId } = req.body;
        if (userId) {
            const user_data = await userModel.findById({ _id: userId });
            if (user_data) {
                res.status(200).json({
                    result: 'true',
                    msg: 'user details get successfully..',
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

//create Product list api  
const Product_List = async (req, res) => {
    try {
        const result = await productModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..'
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'product data get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

// product details  api
const Product_details = async (req, res) => {
    const { _id } = req.body;
    try {
        if (!_id) {
            return res.status(400).json({ resule: "false", message: "_id field are required" });
        }
        const result = await productModel.findOne({ _id: _id });
        if (!result) {
            return res.status(400).json({ result: 'false', msg: 'record not found..' });
        }

        res.status(200).json({ result: 'true', msg: 'product data get successfully..', data: result });
    } catch (error) {
        console.log(error.message)
    }
};

const Get_Product_User_Data = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ result: "false", message: "userId field required" });
        }
        console.log(userId);
        const result = await productModel.find({ userId: userId });
        console.log(result);
        if (!result || result.length == 0) {
            return res.status(400).json({ result: "false", message: "Record not fount..." });
        }
        res.status(200).json({ result: "true", message: "product data get successfully...", data: result });

    } catch (error) {
        res.status(400).json({ result: "false", message: error.message });
    }
};

const Vendor_Listing_Details = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ result: "false", msg: "vendorId required parameter" });
        }
        const result = await userModel.find({ userId: userId });
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..'
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'vendor data get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create add category login api  
const Add_Category = async (req, res) => {
    const { category_name, description } = req.body;
    try {
        if (category_name && description) {

            const category_register = new categoryModel({ category_name, description, category_image: req.file.filename });
            const category_data = await category_register.save();

            res.status(200).json({
                result: 'true',
                msg: 'category data add successfully..',
            });
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required category_name, description & category_image..'
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create category list api  
const Category_List = async (req, res) => {
    try {
        const result = await categoryModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..'
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'category data get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create category update api  
const Update_Category = async (req, res) => {
    try {
        const { categoryId, category_name, description } = req.body;
        const category_image = req.file;

        if (categoryId) {

            const category_data = await categoryModel.findById({ _id: categoryId });

            if (category_data) {

                const updateFields = {}; // Create an object to store the fields to be updated

                if (category_image) {
                    updateFields.category_image = category_image.filename;
                }

                if (category_name) {
                    updateFields.category_name = category_name;
                }

                if (description) {
                    updateFields.description = description;
                }

                // Use $set to update only the specified fields
                const updatedUserData = await categoryModel.findOneAndUpdate(
                    { _id: categoryId },
                    { $set: updateFields },
                    { new: true }
                );
                res.status(200).json({
                    result: 'true',
                    msg: 'category data update successfully..',
                })
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: 'catgoryId does not exist..',
                })
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required categoryId, (optional parameter)category_name,description & category_image..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create category delete api
const Delete_Category = async (req, res) => {
    try {
        const categoryId = req.params.id
        const categoryData = await categoryModel.findByIdAndDelete({ _id: categoryId });
        const subcategoryData = await subcategoryModel.deleteMany({ categoryId: categoryId });

        if (!categoryData) {
            res.status(400).json({
                result: 'false',
                msg: 'Category not found',
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'category data delete successfully..',
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

//create add subcategory login api  
const Add_SubCategory = async (req, res) => {
    const { categoryId, subcategory_name, description } = req.body;
    try {
        if (categoryId && subcategory_name && description) {

            const subcategory_register = new subcategoryModel({ categoryId, subcategory_name, description, subcategory_image: req.file.filename });
            const subcategory_data = await subcategory_register.save();

            res.status(200).json({
                result: 'true',
                msg: 'subcategory data add successfully..',
            });
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required categoryId, subcategory_name, description & subcategory_image..'
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create subcategory list api  
const SubCategory_List = async (req, res) => {
    try {
        const result = await subcategoryModel.find({}).populate('categoryId');
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..'
            });
        } else {
            const data = result.map(item => ({
                categoryId: item.categoryId._id,
                category_name: item.categoryId.category_name,
                subcategoryId: item._id,
                subcategory_name: item.subcategory_name,
                description: item.description,
                subcategory_image: item.subcategory_image,
                subcategory_status: item.subcategory_status
            }));
            res.status(200).json({
                result: 'true',
                msg: 'subcategory data get successfully..',
                data: data
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

//create subcategory update api  
const Update_SubCategory = async (req, res) => {
    try {
        const { subcategoryId, subcategory_name, description } = req.body;
        const subcategory_image = req.file;

        if (subcategoryId) {

            const subcategory_data = await subcategoryModel.findById({ _id: subcategoryId });

            if (subcategory_data) {

                const updateFields = {}; // Create an object to store the fields to be updated

                if (subcategory_image) {
                    updateFields.subcategory_image = subcategory_image.filename;
                }

                if (subcategory_name) {
                    updateFields.subcategory_name = subcategory_name;
                }

                if (description) {
                    updateFields.description = description;
                }

                // Use $set to update only the specified fields
                const updatedUserData = await subcategoryModel.findOneAndUpdate(
                    { _id: subcategoryId },
                    { $set: updateFields },
                    { new: true }
                );
                res.status(200).json({
                    result: 'true',
                    msg: 'subcategory data update successfully..',
                })
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: 'catgoryId does not exist..',
                })
            }
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'parameter required subcategoryId, (optional parameter)subcategory_name,description & subcategory_image..'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};

//create subcategory delete api
const Delete_SubCategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id
        const subcategoryData = await subcategoryModel.findByIdAndDelete({ _id: subcategoryId });
        if (!subcategoryData) {
            res.status(400).json({
                result: 'false',
                msg: 'SubCategory not found',
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'subcategory data delete successfully..',
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

// add and update membership api
const Add_membership = async (req, res) => {
    try {
        const memberships = req.body;
        if (!Array.isArray(memberships) || memberships.length === 0) {
            return res.status(400).json({ result: "false", message: "Memberships array is required. and amount, plan_validity key required" });
        }
        for (let data of memberships) {
            const { amount, plan_validity, membership_plan_status } = data;
            if (!amount || !plan_validity) {
                return res.status(400).json({
                    result: "false", message: "amount, plan_validity not pass an array",
                });
            }
        }
        const existingRecords = await membershipModel.countDocuments();
        console.log("Existing Records Length:", existingRecords);

        if (existingRecords === 0) {
            console.log("This record has been Added");
            const addedMemberships = await membershipModel.insertMany(memberships);
            res.status(200).json({ result: "true", message: "Memberships added successfully.", data: addedMemberships });
        } else {
            const bulkOps = memberships.map(detail => ({
                updateMany: {
                    filter: {},
                    update: { $set: { amount: detail.amount, plan_validity: detail.plan_validity, membership_plan_status: detail.membership_plan_status } },
                    upsert: false
                }
            }));
            // console.log("bulkops",bulkOps);
            const updatemembershipsdata = await membershipModel.bulkWrite(bulkOps);
            res.status(200).json({ result: "true", message: "Memberships Update successfully.", data: updatemembershipsdata });
            console.log("This record has been Updated", updatemembershipsdata);
        }
    } catch (error) {
        res.status(400).json({ result: "false", message: error.message });
    }
};

// get membership list api
const Get_membership_list = async (req, res) => {
    try {
        const result = await membershipModel.find({});
        if (!result || result.length == 0) {
            return res.status(400).json({ resule: "false", message: "Record not found ..." });
        }
        res.status(200).json({ result: "false", message: "membership list data get successfully...", data: result });
    } catch (error) {
        res.status(400).json({ resule: "false", message: error.message });
    }
}

const Get_Business_list = async (req, res) => {
    try {
        const result = await businessModel.find({});
        if (!result) {
            res.status(400).json({ result: 'false', msg: 'record not found..', })
        } else {
            res.status(200).json({ result: 'true', msg: 'business list data get successfully..', data: result });
        }
    } catch (error) {
        res.status(400).json({ resule: "false", msg: error.message })
    }
}

const Get_Business_Details = async (req, res) => {
    try {
        const { businessId } = req.body;
        if (!businessId) {
            return res.status(400).json({ result: "false", msg: "businessId field requird" });
        }

        const result = await businessModel.findOne({ _id: businessId });
        if (!result) {
            res.status(400).json({ result: 'false', msg: 'record not found..', })
        } else {
            res.status(200).json({ result: 'true', msg: 'business listing data get successfully..', data: result });
        }
    } catch (error) {
        res.status(400).json({ resule: "false", msg: error.message })
    }
}

const Business_Listing_Details = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ result: "false", msg: "required parameter userId.." });
        }
        const result = await businessModel.find({ userId: userId });
        if (!result || result.length == 0) {
            res.status(400).json({
                result: 'false',
                msg: 'record not found..'
            });
        } else {
            res.status(200).json({
                result: 'true',
                msg: 'business data get successfully..',
                data: result
            });
        }
    } catch (error) {
        console.log(error.message)
    }
};

const Vendor_Status_Update = async (req, res) => {
    try {
        const { userId, user_status } = req.body;
        if (!userId || !user_status) {
            return res.status(400).json({
                result: 'false',
                msg: 'Parameter required: userId, user_status...'
            });
        }

        const user_data = await userModel.findOne({ _id: userId });

        if (!user_data) {
            return res.status(400).json({
                result: 'false',
                msg: 'userId does not exist.'
            });
        }
        const updatedUserData = await userModel.findOneAndUpdate(
            { _id: userId },
            { $set: { 'user_status': user_status } },
            { new: true }
        );

        // Send success response
        res.status(200).json({
            result: 'true',
            msg: 'User status updated successfully.',
            data: updatedUserData
        });
    } catch (error) {
        console.error('Error updating users status:', error.message);
        res.status(500).json({
            result: 'false',
            msg: 'An error occurred while updating users status.',
            error: error.message
        });
    }
};

const Update_Product_Status = async (req, res) => {
    try {
        const { productId, product_status } = req.body;
        if (!productId || !product_status) {
            return res.status(400).json({
                result: 'false',
                msg: 'Parameter required: productId, product_status(active = 0,inActive = 1)...'
            });
        }

        const user_data = await productModel.findOne({ _id: productId });

        if (!user_data) {
            return res.status(400).json({
                result: 'false',
                msg: 'productId does not exist.'
            });
        }

        const updatedUserData = await productModel.findByIdAndUpdate(
            { _id: productId },
            { $set: { 'product_status': product_status } },
            { new: true }
        );

        res.status(200).json({
            result: 'true',
            msg: 'product status updated successfully.',
            data: updatedUserData
        });
    } catch (error) {
        console.error('Error updating product status:', error.message);
        res.status(500).json({
            result: 'false',
            msg: 'An error occurred while updating product status.',
            error: error.message
        });
    }
};

// create add contact api admin
const Add_Contact = async (req, res) => {
    const { phone_number, toll_free_number, email, address } = req.body;
    try {
        if (!phone_number || !email || !address) {
            return res.status(400).json({ result: "false", msg: "parameter required: phone_number, email & address.. optional parameter: toll_free_number" })
        }
        const existingdata = await contactModel.find({});
        if (!existingdata || existingdata.length == 0) {

            const contact_add = new contactModel({ phone_number, toll_free_number, email, address });
            const contact_data = await contact_add.save();
            res.status(200).json({ result: 'true', msg: 'contact data add successfully..' });
        } else {
            res.status(400).json({ result: "false", msg: "one record already exist" });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", message: error.message });
    }
};

// create updata contact api admin
const Update_Contact = async (req, res) => {
    const { contactId, phone_number, toll_free_number, email, address } = req.body;
    try {
        if (!contactId) {
            return res.status(400).json({ result: "false", msg: "parameter required:  contactId option paramerter :  phone_number, toll_free_number, email, address " })
        }
        const contact_data = await contactModel.findById({ _id: contactId });

        if (contact_data) {
            const updateFields = {};

            if (phone_number) updateFields.phone_number = phone_number;
            if (toll_free_number) updateFields.toll_free_number = toll_free_number;
            if (email) updateFields.email = email;
            if (address) updateFields.address = address;

            const updatedcontactData = await contactModel.findByIdAndUpdate(
                { _id: contactId },
                { $set: updateFields },
                { new: true }
            );

            res.status(200).json({ result: 'true', msg: 'product status updated successfully.', data: updatedcontactData });
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'contactId does not exist..',
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", message: error.message });
    }
}

// create get contact list api admin
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

// creat contact user list api admin 
const Get_Contactuser_list = async (req, res) => {
    try {
        const result = await contactuserModel.find({});
        if (!result || result.length == 0) {
            res.status(400).json({ result: 'false', msg: 'record not found..', })
        } else {
            res.status(200).json({ result: 'true', msg: 'contact list data get successfully..', data: result });
        }
    } catch (error) {
        res.status(400).json({ resule: "false", msg: error.message })
    }
}

// create term add api admin
const Add_Terms = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ result: "false", msg: "parameter required: title, description" });
        }

        const existingdata = await termModel.find({});

        if (!existingdata || existingdata.length == 0) {

            const term_add = new termModel({ title, description });
            const term_data = await term_add.save();
            res.status(200).json({ result: 'true', msg: 'terms data add successfully..' });
        } else {
            res.status(400).json({ result: "false", msg: "one record already exist" });
        }
    } catch (error) {
        res.status(400).json({ result: "false", msg: error.message });
    }
}
// create term update api admin
const Update_Terms = async (req, res) => {
    try {
        const { termsId, title, description } = req.body;
        if (!termsId) {
            return res.status(400).json({ result: "false", msg: "parameter required: termsId, optiona paramerter : title, description" });
        }

        const terms_data = await termModel.findById({ _id: termsId });

        if (terms_data) {

            const updateFields = {};

            if (title) updateFields.title = title;
            if (description) updateFields.description = description;

            const updatedtermsData = await termModel.findOneAndUpdate(
                { _id: termsId },
                { $set: updateFields },
                { new: true }
            );
            res.status(200).json({ result: 'true', msg: 'terms data updated successfully..', data: updatedtermsData });
        } else {
            res.status(400).json({
                result: 'false',
                msg: 'termsId does not exist..',
            })
        }
    } catch (error) {
        res.status(400).json({ result: "false", msg: error.message });
    }
}
// create get term list api admin
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

// create faq add and update api admin
const Add_Faq = async (req, res) => {
    try {
        const { _id, title, question, description } = req.body;
        if (!title || !question || !description) {
            return res.status(400).json({ result: "false", msg: "parameter required: title, question and description optional _id(updated)" });
        }
        if (_id) {
            const faq_data = await faqModel.findById({ _id: _id });

            if (faq_data) {
                // updated record
                const updateFields = {};

                if (title) updateFields.title = title;
                if (question) updateFields.question = question;
                if (description) updateFields.description = description;

                const updatedtermsData = await faqModel.findOneAndUpdate(
                    { _id: _id },
                    { $set: updateFields },
                    { new: true }
                );
                res.status(200).json({ result: 'true', msg: 'faq data updated successfully..', data: updatedtermsData });
            } else {
                res.status(400).json({
                    result: 'false',
                    msg: '_id does not exist..',
                })
            }
        } else {
            // add new record
            const faq_add = new faqModel({ title, question, description });
            const faq_data = await faq_add.save();
            res.status(200).json({ result: 'true', msg: 'faq data add successfully..', data: faq_data });
        }

    } catch (error) {
        res.status(400).json({ result: "false", msg: error.message });
    }
}

// create get faq list api admin
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

// create privacy & policy add and update api admin
const Add_Privacy_Policy = async (req, res) => {
    try {
        const { _id, title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ result: "false", msg: "parameter required: title , description optional _id(updated)" });
        }
        const privacydata = await privacypolicyModel.findOne({});

        if (privacydata) {
            if (_id) {
                const privacy_data = await privacypolicyModel.findById({ _id: _id });
                if (privacy_data) {
                    // updated record
                    const updateFields = {};

                    if (title) updateFields.title = title;
                    if (description) updateFields.description = description;

                    const updatedtermsData = await privacypolicyModel.findOneAndUpdate(
                        { _id: _id },
                        { $set: updateFields },
                        { new: true }
                    );
                    res.status(200).json({ result: 'true', msg: 'privacypolicy data updated successfully..', data: updatedtermsData });
                } else {
                    res.status(400).json({
                        result: 'false',
                        msg: '_id does not exist',
                    })
                }
            } else {
                res.status(400).json({ result: 'false', msg: '_id not send and one record already exist' });
            }
        } else {
            // add new record
            const privacypolicy_add = new privacypolicyModel({ title, description });
            const privacypolicy_data = await privacypolicy_add.save();
            res.status(200).json({ result: 'true', msg: 'privacypolicy data add successfully..', data: privacypolicy_data });
        }
    } catch (error) {
        res.status(400).json({ result: "false", msg: error.message });
    }
}

// create get privacy policy list api admin
const Get_Privacy_Policy = async (req, res) => {
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

// create category status update api admin
const Update_Category_Status = async (req, res) => {
    try {
        const { categoryId } = req.body;
        if (!categoryId) {
            return res.status(400).json({ result: "false", msg: "parameter required: categoryId active=(0) inactive=(1)" });
        }
        const Category_data = await categoryModel.findOne({ _id: categoryId });

        if (Category_data) {

            let category_status_newdata = "";
            if (Category_data.category_status == "0") {
                category_status_newdata = "1";
            } else {
                category_status_newdata = "0";
            }

            const updatedUserData = await categoryModel.findByIdAndUpdate(
                { _id: categoryId },
                { $set: { 'category_status': category_status_newdata } },
                { new: true }
            );

            res.status(200).json({ result: "true", msg: "update category status successfully..", data: updatedUserData });

        } else {
            res.status(400).json({ result: "false", msg: "categoryId does not exist" });
        }
    } catch (error) {
        res.status(500).json({ result: "false", message: error.message });
    }
}

// create subcategory status update api admin
const Update_SubCategory_Status = async (req, res) => {
    try {
        const { subcategoryId } = req.body;
        if (!subcategoryId) {
            return res.status(400).json({ result: "false", msg: "parameter required: subcategoryId active=(0) inactive=(1)" });
        }
        const subcategory_data = await subcategoryModel.findOne({ _id: subcategoryId });

        if (subcategory_data) {

            let subcategory_status_newdata = "";
            if (subcategory_data.subcategory_status == "0") {
                subcategory_status_newdata = "1";
            } else {
                subcategory_status_newdata = "0";
            }

            const updatedUserData = await subcategoryModel.findByIdAndUpdate(
                { _id: subcategoryId },
                { $set: {'subcategory_status': subcategory_status_newdata } },
                { new: true }
            );

            res.status(200).json({ result: "true", msg: "update category status successfully..", data: updatedUserData });

        } else {
            res.status(400).json({ result: "false", msg: "subcategoryId does not exist" });
        }
    } catch (error) {
        res.status(500).json({ result: "false", message: error.message });
    }
}
module.exports = {
    Admin_Login,
    User_List,
    Vendor_List,
    User_Profile,
    Product_List,
    Add_Category,
    Category_List,
    Update_Category,
    Delete_Category,
    Add_SubCategory,
    SubCategory_List,
    Update_SubCategory,
    Delete_SubCategory,
    // new data add
    Get_Business_list,
    Get_Business_Details,
    Add_membership,
    Get_membership_list,
    Product_details,
    Get_Product_User_Data,
    Vendor_Listing_Details,
    Business_Listing_Details,
    Vendor_Status_Update,
    Update_Product_Status,
    Add_Contact,
    Update_Contact,
    Get_Contact_list,
    Get_Contactuser_list,
    Add_Terms,
    Update_Terms,
    Get_Term_list,
    Add_Faq,
    Get_Faq_List,
    Add_Privacy_Policy,
    Get_Privacy_Policy,

    Update_Category_Status,
    Update_SubCategory_Status,
}

