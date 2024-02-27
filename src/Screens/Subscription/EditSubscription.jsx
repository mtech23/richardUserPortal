import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import { useParams } from "react-router";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const EditSubscription = () => {
    const {id} = useParams();
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    const base_url = process.env.REACT_APP_API_URL;
        const fetchSubscriptionData = () => {

        document.querySelector('.loaderBox').classList.remove("d-none");
        document.title = 'Medical Customer Portal | Subscription';
        const LogoutData = localStorage.getItem('login');

        fetch(`${base_url}/api/admin/subscription_view/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)
                setFormData(data.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }

    useEffect(()=>{
        fetchSubscriptionData()
    },[])

    const SubscriptionStatus = [
        {
            name: 'Active',
            code: 1
        },
        {
            name: 'Inactive',
            code: 0
        }
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const filehandleChange = (event) => {
        const file = event.target.files[0];
        // console.log(file.name)
        if (file) {
            const fileName = file;
            setFormData((prevData) => ({
                ...prevData,
                ad_image: fileName,
            }));
        }
        console.log(formData)
    };




    const LogoutData = localStorage.getItem('login');


    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${base_url}/api/admin/subscription_add_update/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data);
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };




    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Subscription
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Subscription Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Subscription Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Plan Name'
                                                    required
                                                    id='plan'
                                                    type='text'
                                                    placeholder='Enter Plan Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="plan"
                                                    value={formData.plan}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Price'
                                                    required
                                                    id='price'
                                                    type='text'
                                                    placeholder='Enter Price'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="status"
                                                    inputClass='mainInput'
                                                    label="Select Status"
                                                    required
                                                    value={formData.status}
                                                    option={SubscriptionStatus}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Udpate' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Subscription Update Successfully.' />

            </DashboardLayout>
        </>
    );
};

