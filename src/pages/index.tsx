import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Lottie from "lottie-react";
import animation from "@/components/UI/Loading/homeAnimation.json";
import HeadComponent from "@/Head/HeadComponent";
import { useAuth } from "@/store/AuthContext";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <HeadComponent
        title=" Manage Courses"
        description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea vitae, nihil laborum maxime impedit illum alias aut nesciunt nisi earum incidunt eligendi molestiae provident non dolorum recusandae doloribus tenetur. Autem!"
      />
      <section className={styles.container}>
        <div className={styles.homeInner}>
          <div className={styles.homeTop}>
            <div className={styles.content}>
              <h1>Manage Courses much easier</h1>
              <p>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Ea vitae,
                nihil laborum maxime impedit illum alias aut nesciunt <br /> nisi earum incidunt eligendi molestiae
                provident non dolorum recusandae doloribus tenetur. Autem! Lorem ipsum <br /> dolor sit amet. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Ea vitae, nihil laborum maxime <br /> impedit illum
                alias aut nesciunt nisi earum incidunt eligendi molestiae provident non dolorum recusandae doloribus
                tenetur. Autem!
              </p>
              {isLoggedIn ? <a href="/dashboard">Dashboard</a> : <a href="/login">Login</a>}
            </div>

            <div className={styles.animation}>
              <Lottie animationData={animation} loop={true} />
            </div>
          </div>
          <div className={styles.homeBottom}>
            <h3>What's Different About Manage</h3>
            <div className={styles.cardsContainer}>
              <div className={styles.card}>
                <Image
                  src={"https://github.com/bradtraversy/tailwind-landing-page/blob/main/img/avatar-anisha.png?raw=true"}
                  width={80}
                  height={80}
                  alt="user image"
                />
                <article>
                  <h5>Anisha Li</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, voluptatum aliquam? Labore
                    dolores quasi molestias corrupti tenetur quae, neque cumque.
                  </p>
                </article>
              </div>
              <div className={styles.card}>
                <Image
                  src={"https://github.com/bradtraversy/tailwind-landing-page/blob/main/img/avatar-anisha.png?raw=true"}
                  width={70}
                  height={70}
                  alt="user image"
                />
                <article>
                  <h5>Anisha Li</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, voluptatum aliquam? Labore
                    dolores quasi molestias corrupti tenetur quae, neque cumque.
                  </p>
                </article>
              </div>
              <div className={styles.card}>
                <Image
                  src={"https://github.com/bradtraversy/tailwind-landing-page/blob/main/img/avatar-anisha.png?raw=true"}
                  width={70}
                  height={70}
                  alt="user image"
                />
                <article>
                  <h5>Anisha Li</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, voluptatum aliquam? Labore
                    dolores quasi molestias corrupti tenetur quae, neque cumque.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
