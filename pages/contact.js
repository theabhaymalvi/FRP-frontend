import Image from "next/image";
import pic from "../asset/pic.jpg";

export default function contact() {
  return (
    <div className="contactUs">
      <div className="info">
        <h1>CONTACT US</h1>
      </div>
      <div className="contact">
        <p>
          Postal Address: The LNM Institute of Information Technology Rupa ki
          Nangal, Post Sumel, Via Jamdoli Jaipur-302031
          <br></br>
          <br></br>
          Post Box Address: <br></br>Ordinary/Book Post - Post Box No. 618
          Jawahar Nagar Head Post Office. Jaipur, Pin 302004 <br></br>
          Registered Speed Post-Gram- Rupa ki Nangal Post Sumel, Via Jamdoti,
          Jaipur-302031
          <br></br>
          <br></br>Contact Information:<br></br>
          Contact No. - 1500-180-6566 <br></br>
          Email ID - recruitmenthelp@lnmiit.ac.in
        </p>

        <Image
          src={pic}
          align="right"
          width="800"
          height="400"
          style={{ marginBottom: 20 }}
        />
      </div>
    </div>
  );
}
