import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Toggle } from "../../components/ui/Toggle";
import { Bell, Calendar, Users, Save } from "lucide-react";

export default function Settings() {

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
    },
    business: {
      name: "DPelos Barbería",
      address: "Calle Principal 123",
      phone: "123456789",
      email: "contacto@dpelos.com",
      workingHours: {
        lunes: { open: "09:00", close: "18:00", isActive: true },
        martes: { open: "09:00", close: "18:00", isActive: true },
        miercoles: { open: "09:00", close: "18:00", isActive: true },
        jueves: { open: "09:00", close: "18:00", isActive: true },
        viernes: { open: "09:00", close: "18:00", isActive: true },
        sabado: { open: "10:00", close: "14:00", isActive: true },
        domingo: { open: "00:00", close: "00:00", isActive: false }
      }
    },
    appointments: {
      interval: 30, // minutos
      maxPerDay: 20,
      allowOnlineBooking: true,
      requireConfirmation: true
    },
    payments: {
      acceptCash: true,
      acceptCards: true,
      acceptTransfers: true,
      defaultCurrency: "USD"
    }
  });

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      business: {
        ...prev.business,
        workingHours: {
          ...prev.business.workingHours,
          [day]: {
            ...prev.business.workingHours[day],
            [field]: value
          }
        }
      }
    }));
  };

  const handleDayToggle = (day) => {
    setSettings(prev => ({
      ...prev,
      business: {
        ...prev.business,
        workingHours: {
          ...prev.business.workingHours,
          [day]: {
            ...prev.business.workingHours[day],
            isActive: !prev.business.workingHours[day].isActive
          }
        }
      }
    }));
  };

  const handleSave = () => {
    // Aquí irá la lógica para guardar los cambios en la API
    console.log("Guardando configuración:", settings);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Configuración</h1>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <div className="space-y-6">

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-gold-500"/>
            <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Notificaciones por Email</h3>
                <p className="text-sm text-gray-500">Recibir notificaciones en tu correo electrónico</p>
              </div>
              <Toggle
                checked={settings.notifications.email}
                onChange={(value) => handleSettingChange("notifications", "email", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Notificaciones por SMS</h3>
                <p className="text-sm text-gray-500">Recibir notificaciones por mensaje de texto</p>
              </div>
              <Toggle
                checked={settings.notifications.sms}
                onChange={(value) => handleSettingChange("notifications", "sms", value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">Información del Negocio</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Negocio
              </label>
              <input
                type="text"
                value={settings.business.name}
                onChange={(e) => handleSettingChange("business", "name", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={settings.business.address}
                onChange={(e) => handleSettingChange("business", "address", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={settings.business.phone}
                  onChange={(e) => handleSettingChange("business", "phone", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.business.email}
                  onChange={(e) => handleSettingChange("business", "email", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">Horario de Trabajo</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.business.workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hours.isActive}
                    onChange={() => handleDayToggle(day)}
                    className="h-4 w-4 rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                  />
                  <span className="text-sm font-medium text-gray-700 w-24">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => handleWorkingHoursChange(day, "open", e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={!hours.isActive}
                  />
                  <span className="text-gray-500">a</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => handleWorkingHoursChange(day, "close", e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={!hours.isActive}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">Configuración de Citas</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intervalo entre Citas (minutos)
              </label>
              <input
                type="number"
                value={settings.appointments.interval}
                onChange={(e) => handleSettingChange("appointments", "interval", parseInt(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                min="15"
                step="15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo de Citas por Día
              </label>
              <input
                type="number"
                value={settings.appointments.maxPerDay}
                onChange={(e) => handleSettingChange("appointments", "maxPerDay", parseInt(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                min="1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Reservas en Línea</h3>
                <p className="text-sm text-gray-500">Permitir que los clientes reserven en línea</p>
              </div>
              <Toggle
                checked={settings.appointments.allowOnlineBooking}
                onChange={(value) => handleSettingChange("appointments", "allowOnlineBooking", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Confirmación Requerida</h3>
                <p className="text-sm text-gray-500">Las citas requieren confirmación</p>
              </div>
              <Toggle
                checked={settings.appointments.requireConfirmation}
                onChange={(value) => handleSettingChange("appointments", "requireConfirmation", value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
