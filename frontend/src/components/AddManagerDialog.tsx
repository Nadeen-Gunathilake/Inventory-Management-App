import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { User } from "../models/user";
import { UserInput } from "../network/user_api";
import { useForm } from "react-hook-form";
import * as UserApi from "../network/user_api";
import TextInputField from "./from/TextInputField";

interface AddUserDialogProps {
    onDismiss: () => void,
    onUserSaved: (user: User) => void,
}

const AddUserDialog = ({ onDismiss, onUserSaved }: AddUserDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserInput>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            type: "Manager",
        }
    });

    async function onSubmit(input: UserInput) {
        try {

            const userResponse = await UserApi.createUser(input);
            onUserSaved(userResponse);
            onDismiss();

        } catch (error) {
            console.error("Error saving user:", error);
            alert(error);
        }
    }


        return (
            <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Manager
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id="addManagerForm" onSubmit={handleSubmit(onSubmit)}>
                        <TextInputField
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Username"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.username}
                        />

                        <TextInputField
                            name="email"
                            label="Email"
                            type="text"
                            placeholder="Email"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.email}
                        />

                        <TextInputField
                            name="password"
                            label="Password"
                            type="string"
                            placeholder="Password"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.password}
                        />
                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        form="addManagerForm"
                        disabled={isSubmitting}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }


    export default AddUserDialog;