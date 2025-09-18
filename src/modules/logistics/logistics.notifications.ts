import nodemailer from "nodemailer";
import { Notification } from "./logistics.types";

// Email configuration
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// SMS configuration (using a service like Twilio)
const SMS_CONFIG = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  fromNumber: process.env.TWILIO_FROM_NUMBER,
};

// Email templates
const EMAIL_TEMPLATES = {
  orderCreated: (data: any) => ({
    subject: `Order #${data.orderNumber} Created Successfully`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Confirmation</h2>
        <p>Dear ${data.customerName},</p>
        <p>Your order has been successfully created with the following details:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Order Number:</strong> ${data.orderNumber}</p>
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Pickup:</strong> ${data.pickupAddress}</p>
          <p><strong>Delivery:</strong> ${data.deliveryAddress}</p>
          <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
          <p><strong>Total Amount:</strong> ${data.currency} ${data.totalAmount}</p>
        </div>
        <p>You can track your order status at any time using our tracking system.</p>
        <p>Thank you for choosing our logistics services!</p>
        <p>Best regards,<br>Bloomzon Logistics Team</p>
      </div>
    `,
  }),

  orderStatusUpdate: (data: any) => ({
    subject: `Order #${data.orderNumber} Status Update`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Status Update</h2>
        <p>Dear ${data.customerName},</p>
        <p>Your order status has been updated:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Order Number:</strong> ${data.orderNumber}</p>
          <p><strong>New Status:</strong> ${data.status}</p>
          <p><strong>Updated At:</strong> ${data.updatedAt}</p>
          ${data.location ? `<p><strong>Location:</strong> ${data.location}</p>` : ""}
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
        </div>
        <p>You can track your order status at any time using our tracking system.</p>
        <p>Best regards,<br>Bloomzon Logistics Team</p>
      </div>
    `,
  }),

  serviceProviderVerification: (data: any) => ({
    subject: "Service Provider Account Verification",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Account Verification Required</h2>
        <p>Dear ${data.companyName},</p>
        <p>Your service provider account has been created and requires verification.</p>
        <p>Please submit the following documents for verification:</p>
        <ul>
          <li>Business License</li>
          <li>Tax Certificate</li>
          <li>Insurance Documents</li>
          <li>Identity Proof</li>
        </ul>
        <p>Once verified, you'll be able to start offering logistics services on our platform.</p>
        <p>Best regards,<br>Bloomzon Logistics Team</p>
      </div>
    `,
  }),

  serviceProviderApproved: (data: any) => ({
    subject: "Service Provider Account Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Account Approved!</h2>
        <p>Dear ${data.companyName},</p>
        <p>Congratulations! Your service provider account has been approved.</p>
        <p>You can now:</p>
        <ul>
          <li>Create and manage logistics services</li>
          <li>Receive customer orders</li>
          <li>Access the provider dashboard</li>
          <li>Manage your pricing and coverage areas</li>
        </ul>
        <p>Welcome to the Bloomzon Logistics network!</p>
        <p>Best regards,<br>Bloomzon Logistics Team</p>
      </div>
    `,
  }),
};

// SMS templates
const SMS_TEMPLATES = {
  orderCreated: (data: any) =>
    `Bloomzon: Order #${data.orderNumber} created. Track at: ${process.env.FRONTEND_URL}/track/${data.orderId}`,

  orderStatusUpdate: (data: any) =>
    `Bloomzon: Order #${data.orderNumber} status: ${data.status}. ${data.location ? `Location: ${data.location}` : ""}`,

  serviceProviderVerification: (data: any) =>
    `Bloomzon: Your account needs verification. Please submit required documents.`,

  serviceProviderApproved: (data: any) =>
    `Bloomzon: Congratulations! Your service provider account has been approved.`,
};

// Email notification functions
export const sendEmail = async (
  to: string,
  template: keyof typeof EMAIL_TEMPLATES,
  data: any
): Promise<boolean> => {
  try {
    const templateData = EMAIL_TEMPLATES[template](data);

    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@bloomzon.com",
      to,
      subject: templateData.subject,
      html: templateData.html,
    };

    await emailTransporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to} for ${template}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    return false;
  }
};

// SMS notification functions (using Twilio as example)
export const sendSMS = async (
  to: string,
  template: keyof typeof SMS_TEMPLATES,
  data: any
): Promise<boolean> => {
  try {
    // This is a placeholder for SMS integration
    // In production, you would integrate with Twilio, MessageBird, etc.

    if (!SMS_CONFIG.accountSid || !SMS_CONFIG.authToken) {
      console.warn("SMS not configured. Skipping SMS notification.");
      return false;
    }

    const message = SMS_TEMPLATES[template](data);

    // Placeholder for actual SMS sending
    console.log(`SMS would be sent to ${to}: ${message}`);

    // Uncomment and configure when SMS service is integrated
    /*
    const client = require('twilio')(SMS_CONFIG.accountSid, SMS_CONFIG.authToken);
    await client.messages.create({
      body: message,
      from: SMS_CONFIG.fromNumber,
      to: to
    });
    */

    return true;
  } catch (error) {
    console.error(`Failed to send SMS to ${to}:`, error);
    return false;
  }
};

// Push notification functions (placeholder for future implementation)
export const sendPushNotification = async (
  userId: number,
  title: string,
  message: string,
  data?: any
): Promise<boolean> => {
  try {
    // This is a placeholder for push notification integration
    // In production, you would integrate with FCM, APNs, etc.

    console.log(`Push notification would be sent to user ${userId}: ${title} - ${message}`);

    // Placeholder for actual push notification sending
    /*
    // Example with Firebase Cloud Messaging
    const fcm = require('fcm-node');
    const FCM = new fcm(process.env.FCM_SERVER_KEY);

    const message = {
      to: userDeviceToken,
      notification: {
        title,
        body: message,
      },
      data: data || {}
    };

    await FCM.send(message);
    */

    return true;
  } catch (error) {
    console.error(`Failed to send push notification to user ${userId}:`, error);
    return false;
  }
};

// Order notification functions
export const notifyOrderCreated = async (orderData: any): Promise<void> => {
  const promises = [];

  // Email notification to customer
  if (orderData.customerEmail) {
    promises.push(sendEmail(orderData.customerEmail, "orderCreated", orderData));
  }

  // SMS notification to customer
  if (orderData.customerPhone) {
    promises.push(sendSMS(orderData.customerPhone, "orderCreated", orderData));
  }

  // Email notification to service provider
  if (orderData.providerEmail) {
    promises.push(sendEmail(orderData.providerEmail, "orderCreated", orderData));
  }

  // Push notification to customer
  if (orderData.customerId) {
    promises.push(
      sendPushNotification(
        orderData.customerId,
        "Order Created",
        `Your order #${orderData.orderNumber} has been created successfully.`
      )
    );
  }

  await Promise.allSettled(promises);
};

export const notifyOrderStatusUpdate = async (orderData: any): Promise<void> => {
  const promises = [];

  // Email notification to customer
  if (orderData.customerEmail) {
    promises.push(sendEmail(orderData.customerEmail, "orderStatusUpdate", orderData));
  }

  // SMS notification to customer
  if (orderData.customerPhone) {
    promises.push(sendSMS(orderData.customerPhone, "orderStatusUpdate", orderData));
  }

  // Push notification to customer
  if (orderData.customerId) {
    promises.push(
      sendPushNotification(
        orderData.customerId,
        "Order Status Update",
        `Your order #${orderData.orderNumber} status has been updated to ${orderData.status}.`
      )
    );
  }

  await Promise.allSettled(promises);
};

// Service provider notification functions
export const notifyServiceProviderVerification = async (providerData: any): Promise<void> => {
  const promises = [];

  // Email notification
  if (providerData.email) {
    promises.push(sendEmail(providerData.email, "serviceProviderVerification", providerData));
  }

  // SMS notification
  if (providerData.phone) {
    promises.push(sendSMS(providerData.phone, "serviceProviderVerification", providerData));
  }

  await Promise.allSettled(promises);
};

export const notifyServiceProviderApproved = async (providerData: any): Promise<void> => {
  const promises = [];

  // Email notification
  if (providerData.email) {
    promises.push(sendEmail(providerData.email, "serviceProviderApproved", providerData));
  }

  // SMS notification
  if (providerData.phone) {
    promises.push(sendSMS(providerData.phone, "serviceProviderApproved", providerData));
  }

  // Push notification
  if (providerData.userId) {
    promises.push(
      sendPushNotification(
        providerData.userId,
        "Account Approved",
        "Congratulations! Your service provider account has been approved."
      )
    );
  }

  await Promise.allSettled(promises);
};

// Test email configuration
export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    await emailTransporter.verify();
    console.log("Email configuration is valid");
    return true;
  } catch (error) {
    console.error("Email configuration test failed:", error);
    return false;
  }
};

// Export notification types for use in services
export type NotificationType = "email" | "sms" | "push";
export type NotificationTemplate = keyof typeof EMAIL_TEMPLATES;
