import Link from "next/link";


export default function ContactUsMap() {

    const place = encodeURIComponent('101 Frederick St suite 600, Kitchener, ON N2H 6R2');
    return (

        <div className="mx-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground text-center">Find Us</h2>

       
            <div className="relative rounded-lg overflow-hidden shadow ">
           
                    <iframe
                    title="Office location"
                    className="w-full h-120 border-0 "
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${place}&output=embed`}
                    />
               

                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${place}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-sm px-3 py-1.5 rounded-md shadow">
                    Open Google Maps
                </Link>
            </div>
        </div>
    );
}