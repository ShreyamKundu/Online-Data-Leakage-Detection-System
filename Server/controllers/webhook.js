// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const handleWebhook = async (req, res) => {
//   try {
//     const payloadString = req.body.toString("utf8");

//     const svixHeaders = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     if (!process.env.CLERK_WEBHOOK_SECRET_KEY) {
//       throw new Error("CLERK_WEBHOOK_SECRET_KEY is not defined");
//     }
//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

//     const evt = wh.verify(payloadString, svixHeaders);
//     const { id, ...attributes } = evt.data;

//     // Handle the webhooks
//     const eventType = evt.type;
//     if (eventType === "user.created") {
//       console.log(`User ${id} was ${eventType}`);

//       const firstName = attributes.first_name;
//       const lastName = attributes.last_name;
//       const email = attributes.email_addresses[0].email_address;
//       const profileUrl = attributes.profile_image_url;

//       const user = new User({
//         clerkUserId: id,
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         profileUrl: profileUrl,
//       });

//       await user.save();
//       console.log("User saved to database");
//     }

//     res.status(200).json({
//       success: true,
//       message: "Webhook received",
//     });
//   } catch (err) {
//     console.error("Error handling webhook:", err);
//     console.error("Headers:", req.headers);
//     console.error("Payload:", req.body.toString("utf8"));
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
