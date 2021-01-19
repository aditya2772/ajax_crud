     //Method To Get Users List
     let getUsersList = () => {
        $("#usersTableBody tr").remove();
        let index = 1;
        $.ajax({
            type: "GET",
            url: "/manageUsers/getAllUsers",
            success: function (data) {
                for (let user of data) {
                    $("#usersTableBody").append(`
                            <tr>
                                <td>${index++}</td>
                                <td>${user.username}</td>   
                                <td>${user.email}</td>   
                                <td>${user.contact}</td>   
                                <td>
                                    <button class="btn btn-warning" onclick="openEditModal('${user._id}')"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger" onclick="deleteUser('${user._id}', '${user.username}')"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        `)
                }
                alertify.success("Users List Loaded Successfully...")
            },
            error: (err) => {
                alert("Something Went Wrong...");
            }
        });
    }

    //Method To Update User
    let openEditModal = (userId) =>{
        $.ajax({
            type: "GET",
            url: "/manageUsers/edit/"+userId,
            success: function (data) {
                console.log(data.email)
                $('#editUser-modal').modal('show');
                $('#editUserId').val(data._id);
                $('#editUsername').val(data.username);
                $('#editUserEmail').val(data.email );
                $('#editContact').val(data.contact);
                // alertify.success("Users List Loaded Successfully...")
            },
            error: (err) => {
                alert("Something Went Wrong...");
            }
        });
    }

    //Method to Delete User
    let deleteUser = (userId, username) => {
        alertify.confirm("Delte User: " + username, "Do you really want to delete this user", () => {
            $.ajax({
                type: "DELETE",
                url: "/manageUsers/delete/" + userId,
                success: function () {

                    alertify.alert('Success', 'User Delted Successfully', function () {
                        getUsersList();
                    });


                },
                error: (err) => {
                    console.log(err)
                    alertify.error("Something Went Wrong...");
                }
            });
        }, () => {
            alertify.notify("Delete Operation Cancelled");
        })
    }
    $(document).ready(() => {

        getUsersList();



        ///Method To Create New User
        $('#createUserForm').on("submit", function (event) {
            event.preventDefault();

            var formValues = $(this).serialize();

            $.ajax({
                type: "POST",
                url: "/manageUsers/create",
                data: formValues,
                success: function () {

                    alertify.alert('Success', 'User Created Successfully', function () {
                        $('#createUserForm')[0].reset();
                        $('#createUser-modal').modal('hide');
                        getUsersList();
                    });


                },
                error: (err) => {
                    console.log(err)
                    alert("Something Went Wrong...");
                }
            });
        });
        
        //Method To Update User Details
        $('#editUserForm').on("submit", function (event) {
            event.preventDefault();

            var formValues = $(this).serialize();

            $.ajax({
                type: "POST",
                url: "/manageUsers/edit",
                data: formValues,
                success: function () {

                    alertify.alert('Success', 'User Updated Successfully', function () {
                        $('#editUserForm')[0].reset();
                        $('#editUser-modal').modal('hide');
                        getUsersList();
                    });


                },
                error: (err) => {
                    console.log(err)
                    alert("Something Went Wrong...");
                }
            });
        });
    
    })