// src/pages/ClassesPage.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../models/supabaseClient';
import type Class from '../models/Class';



const ClassesPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase.from('classes').select('*');
      if (error) {
        console.error('Errore nel recupero dei dati:', error);
      } else {
        setClasses(data);
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  if (loading) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>Lista delle Classi</h1>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>
            {cls.name} - {cls.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesPage;
