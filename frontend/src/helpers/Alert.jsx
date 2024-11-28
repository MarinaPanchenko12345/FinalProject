import Swal from "sweetalert2";

//Alert without OK timer
export const showAlert = (type, message) => {
  return Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2800,
    width: "400px",
  });
};

//Alert for Delete User
export const showAlertDelete = async () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      await swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "User has been deleted.",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error",
      });
    }
    return result;
  } catch (error) {
    return null;
  }
};

//Alert for password
export const showLoginErrorAlert = (navigate) => {
  Swal.fire({
    icon: "error",
    title:
      "Invalid email or password. You have 3 attempts to enter the correct data. ",
    text: "Forgot your password? Create a new one?",
    showDenyButton: true,
    confirmButtonText: "Yes, reset password",
    denyButtonText: "No, try again",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/reset-password");
    }
  });
};

//Alert with OK
const SimpleAlert = (message) => {
  Swal.fire({
    title: message,
    titleText: message,
    customClass: {
      title: "swal-custom-title",
    },
    didOpen: () => {
      const titleElement = Swal.getTitle();
      if (titleElement) {
        titleElement.style.fontSize = "16px";
      }
    },
  });
};
export default SimpleAlert;
