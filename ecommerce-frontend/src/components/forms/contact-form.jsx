import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import ErrorMsg from "../common/error-msg";

// validation schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().label("Subject"),
  message: Yup.string().required().label("Message"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to the terms and conditions to proceed.")
    .label("Terms and Conditions"),
});

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // on submit
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Create a new FormData object
    const formData = new FormData();
    formData.append('access_key', '99ce98cd-ac15-446f-bacc-2a8f7d7c6eef');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('message', data.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        notifySuccess('Message sent successfully!');
        reset();
      } else {
        notifyError('Failed to send message. Please try again.');
      }
    } catch (error) {
      notifyError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
      <div className="tp-contact-input-wrapper">
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input {...register("name")} id="name" type="text" placeholder="Enter your full name" />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="name">Your Name</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div>

        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input {...register("email")} id="email" type="email" placeholder="Enter your email address" />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>

        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input {...register("subject")} id="subject" type="text" placeholder="What’s your message about?" />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="subject">Subject</label>
          </div>
          <ErrorMsg msg={errors.subject?.message} />
        </div>

        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <textarea {...register("message")} id="message" placeholder="Write your message here..." />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="message">Your Message</label>
          </div>
          <ErrorMsg msg={errors.message?.message} />
        </div>
      </div>

      <div className="tp-contact-suggetions mb-20">
        <div className="tp-contact-remeber">
          <input {...register("remember")} id="remember" type="checkbox" />
          <label htmlFor="remember">Save my name, email, and website in this browser for the next time I comment.</label>
          <ErrorMsg msg={errors.remember?.message} />
        </div>
      </div>

      <div className="tp-contact-btn">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
