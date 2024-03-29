import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../constants/data";
import FormError from "../common/form/FormError";
import Heading from "../layout/typography/Heading";
import React, { useState } from 'react';
import SentForm from "../common/form/SentForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const url = BASE_URL + "/contacts";

const schema = yup.object().shape({
    first_name: yup.string()
            .required("Enter your first name."),
    last_name: yup.string().required("Must enter last name.").min(1, "Type in first letter of surname."),
    email: yup.string()
            .email("The email is not valid.")
            .required("Please enter your email."),
    message: yup.string()
            .required("You must enter your message here.")
            .min(12, "Your message must contain at least 12 characters long."),
});

function Contact() {
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [formSentMessage, setFormSentMessage] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        setSubmitting(true);
        setSubmitError(null);

        try {
            const response = await axios.post(url, data);
            console.log(response);
            setFormSentMessage(true);

            reset({
                first_name: "",
                last_name: "",
                email: "",
                message:""
            });
        } catch (error) {
            console.log("error", error);
            setSubmitError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

	return (
		<div>
			<Heading content="Contact" />
			<form onSubmit={handleSubmit(onSubmit)}>
            {submitError && <FormError>{submitError}</FormError>}
            {formSentMessage && <SentForm></SentForm>}
				<section className="rowform">
				<div>
			        <label className="label" htmlFor="fname">
					    First Name <span className="reqdot">*</span>
				    </label>
                    <input className="input" 
                           id="first_name"
                           type="text" 
                           name="first_name"
                           placeholder="Enter your first name."
                           {...register("first_name")} />
                    {errors.first_name && <FormError>{errors.first_name.message}</FormError>}
				</div>
				<div>
			        <label className="label" htmlFor="fname">
					    Last Name <span className="reqdot">*</span>
				    </label>
                    <input className="input" 
                           id="last_name"
                           type="text" 
                           name="last_name"
                           placeholder="First letter is required."
                           {...register("last_name")} />
                    {errors.last_name && <FormError>{errors.last_name.message}</FormError>}
				</div>
				</section>
                <div>
			        <label className="label" htmlFor="email">
					    Email <span className="reqdot">*</span>
				    </label>
                    <input className="input" 
                           type="email" 
                           name="user_email" 
                           placeholder="Please insert your emai adress."
                           {...register("email")} />
                    {errors.email && <FormError>{errors.email.message}</FormError>}
				</div>
			    <label htmlFor="message">
					Message <span className="reqdot">*</span>
				</label>
			        <textarea id="msg" 
                              name="message" 
                              placeholder="Message must be at least 12 characters long."
                              {...register("message")}>
                    </textarea>
                    {errors.message && <FormError>{errors.message.message}</FormError>}
				<button type="submit" 
                        className="sendbtn">
                            {submitting ? "Sending..." : "SEND"}
                </button>
            </form>
		</div>
	);
}

export default Contact;
