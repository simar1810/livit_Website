"use client";

export default function OurStoryPage() {
  return (
    <main className="ourstory-page-wrap">
      <section className="ourstory-hero">
        <div className="ourstory-hero-inner">
          <h1 className="ourstory-title">About Us</h1>
          <p className="ourstory-subtitle">
            Nature-driven meal plans to fit your day.
          </p>
        </div>
      </section>

      <section className="ourstory-split ourstory-split--first">
        <div className="ourstory-split-media">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhLINHZZdG0_fW8JCI0Q4ZYrwueHl8vHIBCW9LPS-DXs6QXQRlnw_yQ6uzHa4a5ThnCGhkEE0z3OgVAsNdseCB7kTsnvbO_HDyIylLh8P9v_QXYYU8Wc3KPDeHwdBk7_jZoxlCnnq2Teuf5I5rl8PlsDXK09l3ESSBy2V1wLbSNIzgffavr3F7MB5NVafbmZelrtqPyoWdk4BsWGTyXFmpN-7hTZwZjd9PbdU_Sc4rMm5svuTV9O-Xpv0ULsIf1OYfzfVdnHuhdsA"
            alt="Fresh farm ingredients"
          />
        </div>
        <div className="ourstory-split-content">
          <p className="ourstory-kicker">Our philosophy</p>
          <h2 className="ourstory-heading">
            We believe food transcends mere nourishment
          </h2>
          <p className="ourstory-text">
            It&apos;s a daily ritual of vitality, balance, and holistic
            well-being. Our approach to meal prep is designed to seamlessly
            integrate into your lifestyle, fueling your body with purpose and
            premium ingredients.
          </p>
          <p className="ourstory-text">
            Each ingredient is sourced from sustainable local farms, ensuring
            that every bite is as ethical as it is delicious. We uphold the
            highest standards of nutrition and quality in every box we deliver.
          </p>
        </div>
      </section>

      <section className="ourstory-split ourstory-split--second">
        <div className="ourstory-split-content">
          <p className="ourstory-kicker">The craft</p>
          <h2 className="ourstory-heading">Each meal is a masterpiece</h2>
          <p className="ourstory-text">
            Thoughtfully crafted by our gourmet chefs and guided by our
            in-house dietitians and nutritionists. Inspired by mindful eating
            principles, our meals are designed to support your nutritional needs
            while promoting a balanced lifestyle.
          </p>
          <p className="ourstory-text">
            Whether you&apos;re looking to boost energy, enhance wellness, or
            restore balance, our meals are curated to support your ongoing
            journey, fostering long-term vitality and sustained well-being.
          </p>
        </div>
        <div className="ourstory-split-media">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXL54SGNLqu22RyV9Vr4s9-oSLskhdupN3sCXi_RNIb6bILTLQ-SWOyrJTjtiw9JolkXxse2pzHIS7EA_wGuBaSB6FeNXRyrm1SNz311y9ydbF59pFEM-AghUwzmOSCjm9sOD49AN3Q2-LDTXWw6s5m98Ndimq063vbqVnF9u-2fcBZE4qZadVH6ArD2b_E9iN6Bx9ykfLZH8Ppoj8roWmJAlouUsxRJ2_pK2BTFll8D_EnXT9x1q2h1Ly8V3wdtk06d9yVq8tizY"
            alt="Chef preparing fresh meal"
          />
        </div>
      </section>

      <section className="ourstory-highlight">
        <div className="ourstory-highlight-inner">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX5CEJB6V_3EXzHVVmnprBcNOXSiaQ8SwK_2XxXMBGXdzu2J_gzwTjl9wAzX8OX-7uuVsuvLyuuub7liVddD2q8zBK5iQYzMyNa_pTDaLaM7CTIazSaK1G2oLIcDe9pYip_3740muyP4l5RCyrvTiPeqW8tegZOdsSRJp6VIv6PqcyQBFGnrDwtgZjzPfSQ4h5-86OZh5MxMB_cVMK7IHcyeFILJUoF9EJD3GP3OSdyZJWcZBt578oAdUcexCKmYfjXYAvcb4pMxQ"
            alt="Vibrant healthy food"
            className="ourstory-highlight-image"
          />
          <a href="/Home/Program" className="ourstory-cta-btn">
            View our program
          </a>
        </div>
      </section>
    </main>
  );
}
