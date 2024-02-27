import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import './style.css'
export const EditUserDetails = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: ''
  });

  const statusOption = [
    {
      code: 0,
      name: 'Inactive'
    },
    {
      code: 1,
      name: 'Active'
    }
  ]

  const base_url = process.env.REACT_APP_API_URL;


  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [bloodGroup, setBloodGroup] = useState({});
  const [viewData, setViewData] = useState({});
  const [gender, setGender] = useState({});
  const LogoutData = localStorage.getItem('login');
  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const Active = () => {
    setShowModal3(false)
    setShowModal4(true)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    document.querySelector('.loaderBox').classList.remove("d-none");

    // Create a new FormData object
    const formDataMethod = new FormData();
    for (const key in viewData) {
      formDataMethod.append(key, viewData[key]);
    }


    // Make the fetch request
    fetch(`${base_url}/api/user/userdetails_add_update`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${LogoutData}`
      },
      body: formDataMethod // Use the FormData object as the request body
    })
      .then((response) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        return response.json();
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data);
      });
  };


  useEffect(() => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${base_url}/api/user/view_userdetails`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
        setViewData({
          ...viewData,
          name: data.data.name,
          email: data.data.email,
          phone_number: data.data.user_details.phone_number,
          mobile_number: data.data.user_details.mobile_number,
          address: data.data.user_details.address,
          blood_group_id: data.data.user_details.blood_group_id,
          age: data.data.user_details.age

        })

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })

   
  }, []);

  console.log(viewData)
  const bloodGroupList = () => {
    fetch(`${base_url}/api/admin/bloodgroup_listing`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
        setBloodGroup(data.data)

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }


  const GenderList = () => {
    fetch(`${base_url}/api/admin/gender_listing`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
        setGender(data.data)

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }

  useEffect(() => {
    bloodGroupList()
    GenderList()
  }, [])



  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit User Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <span className={`statusBadge ${formData.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{formData.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Name'
                          required
                          id='name'
                          type='text'
                          placeholder='Enter Safe'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="name"
                          value={viewData.name}
                          onChange={((e)=>{
                            setViewData({
                              ...viewData, name: e.target.value
                            })
                            console.log(viewData)
                          })}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Email'
                          required
                          id='address'
                          type='email'
                          placeholder='Enter Email Address'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="email"
                          disabled
                          value={viewData.email}
                          onChange={((e)=>{
                            setViewData({
                              ...viewData, email: e.target.value
                            })
                            console.log(viewData)
                          })}
                          
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Phone'
                          required
                          id='phone'
                          type='number'
                          placeholder='Enter Phone Number'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="phone_number"
                          value={viewData?.phone_number}
                          onChange={(e) => {
                            setViewData({
                              ...viewData,
                              user_details: {
                                ...viewData.user_details,
                                phone_number: e.target.value,
                              },
                            });
                            console.log(viewData)
                          }}
                          
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Address'
                          required
                          id='address'
                          type='text'
                          placeholder='Enter Address'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="address"
                          value={viewData?.address}
                          onChange={((e)=>{
                            setViewData({
                              ...viewData, address: e.target.value
                            })
                            console.log(viewData)
                          })}
                          
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="gender_id"
                          label="Gender"
                          required
                          placeholder="Select Gender"
                          value={viewData?.gender?.id}
                          option={gender}
                          onChange={((e)=>{
                            setViewData({
                              ...viewData, gender_id: e.target.value
                            })
                            console.log(viewData)
                          })}
                          
                        />

                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Mobile'
                          required
                          id='mobile'
                          type='number'
                          placeholder='Enter Mobile Number'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="mobile_number"
                          value={viewData?.mobile_number}
                          onChange={((e)=>{
                            setViewData({
                              ...viewData, mobile_number: e.target.value
                            })
                            console.log(viewData)
                          })}
                          
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Age'
                          required
                          id='age'
                          type='number'
                          placeholder='Enter Age'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="age_number"
                          value={viewData?.age}
                          onChange={((e)=>{
                            setViewData({
                              ...viewData, age: e.target.value
                            })
                            console.log(viewData)
                          })}
                          
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="blood_group_id"
                          label="Blood Group"
                          required
                          placeholder="Select Blood Group"
                          value={viewData?.bloodgroupdetails?.id}
                          option={bloodGroup}
                          onChange={((e)=>{
                            setViewData({
                              ...viewData, blood_group_id: e.target.value
                            })
                            console.log(viewData)
                          })}
                          
                        />

                      </div>

                      <div className="col-md-12">
                        <CustomButton variant='primaryButton' text='Update' type='submit' />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

        <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
        <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
      </DashboardLayout>
    </>
  );
};

