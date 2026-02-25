const de = {
  warmup: {
    title: "ApplyVault wird gestartet…",
    description:
      "Diese Demo nutzt ein Backend mit Kaltstart. Der erste Aufruf kann einen Moment dauern. In der Regel dauert das nicht länger als ein bis zwei Minuten.",
    pinging: "Backend wird geprüft…",
    waiting: "Warten auf nächsten Versuch…",
    attempt: "Versuch",
    reload: "Seite neu laden",
    errorFallback: "Das Backend startet noch.",
  },
  app: {
    title: "ApplyVault",
    nav: {
      allApplications: "Alle Bewerbungen",
      savedSearches: "Gespeicherte Suchen",
      settings: "Einstellungen",
    },
    language: {
      label: "Sprache",
      english: "Englisch",
      german: "Deutsch",
    },
  },
  common: {
    loading: "Wird geladen...",
    yes: "Ja",
    no: "Nein",
    open: "Öffnen",
    cancel: "Abbrechen",
    create: "Erstellen",
    save: "Speichern",
    deleting: "Wird gelöscht...",
    delete: "Löschen",
    empty: "-",
  },
  errors: {
    loadApplications: "Bewerbungen konnten nicht geladen werden.",
    saveApplication: "Bewerbung konnte nicht gespeichert werden.",
    deleteApplication: "Bewerbung konnte nicht gelöscht werden.",
  },
  table: {
    title: "Bewerbungen",
    new: "Neue Bewerbung",
    headers: {
      company: "Unternehmen",
      role: "Rolle",
      location: "Standort",
      remote: "Remote",
      referral: "Empfehlung",
      contactPerson: "Ansprechperson",
      dateApplied: "Bewerbungsdatum",
      status: "Status",
      compensation: "Vergütung",
      lastTouch: "Letzter Kontakt",
      nextAction: "Nächster Schritt",
      nextActionDate: "Datum nächster Schritt",
      notes: "Notizen",
      link: "Link",
    },
    actions: {
      edit: "Bearbeiten",
      delete: "Löschen",
      editAria: "Bewerbung bearbeiten",
      deleteAria: "Bewerbung löschen",
    },
  },
  status: {
    planned: "Geplant",
    applied: "Beworben",
    interviewing: "Im Interview",
    offer: "Angebot",
    rejected: "Abgelehnt",
    accepted: "Angenommen",
    unknown: "Unbekannt",
  },
  dialogs: {
    application: {
      titleCreate: "Neue Bewerbung",
      titleEdit: "Bewerbung bearbeiten",
      description:
        "Fülle die Bewerbungsdaten aus und speichere die Änderungen.",
      saving: "Wird gespeichert...",
      labels: {
        company: "Unternehmen",
        role: "Rolle",
        status: "Status",
        dateApplied: "Bewerbungsdatum",
        location: "Standort",
        remote: "Remote",
        referral: "Empfehlung",
        contactPerson: "Ansprechperson",
        compensationRange: "Vergütungsspanne",
        lastTouch: "Letzter Kontakt",
        nextAction: "Nächster Schritt",
        nextActionDate: "Datum nächster Schritt",
        link: "Link",
        notes: "Notizen",
      },
    },
    confirmDelete: {
      title: "Bewerbung löschen",
      description:
        "Möchtest du {{label}} wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
    },
  },
};

export default de;
