import React, { useEffect } from "react";
import storeProfile from "../context/storeProfile";

// Componentes que puedes crear después
// import UserProfile from "../components/DashboardUser/UserProfile";
// import Chat from "../components/DashboardUser/Chat";
// import EventList from "../components/DashboardUser/EventList";

const Dashboard_Users = () => {
  const profile = storeProfile(state => state.user);
  const fetchProfile = storeProfile(state => state.profile);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, {profile?.nombre || "Usuario"}</h1>

      <section>
        <h2>Mi perfil</h2>
        {/* <UserProfile /> */}
        <p>Aquí va tu perfil (UserProfile)</p>
      </section>

      <section>
        <h2>Eventos recientes</h2>
        {/* <EventList /> */}
        <p>Aquí la lista de eventos (EventList)</p>
      </section>

      <section>
        <h2>Chat</h2>
        {/* <Chat /> */}
        <p>Aquí va el chat (Chat)</p>
      </section>
    </div>
  );
};

export default Dashboard_Users;
