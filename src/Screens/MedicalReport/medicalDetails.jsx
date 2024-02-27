import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFilePdf } from "@fortawesome/free-solid-svg-icons";

export const MedicalDetails = () => {

  const { id } = useParams();
  const base_url = process.env.REACT_APP_API_URL;


 

  const [reportData, setReportData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  useEffect(() => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    document.title = 'Medical Customer Portal | Subscription';
    const LogoutData = localStorage.getItem('login');

    fetch(`${base_url}/api/user/category_view/${id}`,
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
     
        setReportData(data.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
console.log(reportData)

  }, []);



  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const Active = () => {
    setShowModal3(false)
    setShowModal4(true)
  }



  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle text-capitalize">
                <BackButton />
                {reportData?.name}
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  {/* <button onClick={() => {
                    profileData.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {profileData.status ? 'Inactive' : 'Active'}</button> */}
                  <span className="statusBadge statusBadgeActive">Active</span>
                </div>
              </div>

              <div className="row">
                {/* <div className="titleBox">
                  <h4 className="text-capitalize">{reportData?.name}</h4>
                </div> */}

                <div className="reportBox">
                  {reportData?.data && reportData?.data.map((reportData, index) => 
                  (
                    <div className="fileBox" key={index}>
                      <a href={base_url + '/' + reportData.file} target="_blank">
                        <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                      </a>
                      <p>{reportData?.file_name}</p>
                    </div>
                  ))}
                </div>
              </div>
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