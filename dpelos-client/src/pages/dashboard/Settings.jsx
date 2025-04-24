import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Toggle } from "../../components/ui/Toggle";
import { Bell, Calendar, Users, Save } from "lucide-react";
import { Checkbox, Field, Label } from "@headlessui/react";
import Input from "../../components/ui/Input";

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
        domingo: { open: "00:00", close: "00:00", isActive: false },
      },
    },
    appointments: {
      interval: 30, // minutos
      maxPerDay: 20,
      allowOnlineBooking: true,
      requireConfirmation: true,
    },
    payments: {
      acceptCash: true,
      acceptCards: true,
      acceptTransfers: true,
      defaultCurrency: "USD",
    },
  });

  const handleSettingChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setSettings((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        workingHours: {
          ...prev.business.workingHours,
          [day]: {
            ...prev.business.workingHours[day],
            [field]: value,
          },
        },
      },
    }));
  };

  const handleDayToggle = (day) => {
    setSettings((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        workingHours: {
          ...prev.business.workingHours,
          [day]: {
            ...prev.business.workingHours[day],
            isActive: !prev.business.workingHours[day].isActive,
          },
        },
      },
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
            <Bell className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Notificaciones
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Notificaciones por Email
                </h3>
                <p className="text-sm text-gray-500">
                  Recibir notificaciones en tu correo electrónico
                </p>
              </div>
              <Toggle
                checked={settings.notifications.email}
                onChange={(value) =>
                  handleSettingChange("notifications", "email", value)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Notificaciones por SMS
                </h3>
                <p className="text-sm text-gray-500">
                  Recibir notificaciones por mensaje de texto
                </p>
              </div>
              <Toggle
                checked={settings.notifications.sms}
                onChange={(value) =>
                  handleSettingChange("notifications", "sms", value)
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Información del Negocio
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <Input
                label="Nombre del Negocio"
                value={settings.business.name}
                onChange={(e) =>
                  handleSettingChange("business", "name", e.target.value)
                }
                name="name"
                placeholder="Nombre del Negocio"
                required
              />
            </div>
            <div>
              <Input
                label="Dirección"
                value={settings.business.address}
                onChange={(e) =>
                  handleSettingChange("business", "address", e.target.value)
                }
                name="address"
                placeholder="Dirección"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Teléfono"
                  value={settings.business.phone}
                  onChange={(e) =>
                    handleSettingChange("business", "phone", e.target.value)
                  }
                  name="phone"
                  placeholder="Teléfono"
                  required
                />
              </div>
              <div>
                <Input
                  label="Email"
                  value={settings.business.email}
                  onChange={(e) =>
                    handleSettingChange("business", "email", e.target.value)
                  }
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Horario de Trabajo
            </h2>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.business.workingHours).map(
              ([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <Field className="flex items-center gap-2">
                    <Checkbox
                      checked={hours.isActive}
                      onChange={() => handleDayToggle(day)}
                      className="group block size-4 rounded border bg-white data-[checked]:bg-black"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="text-sm text-gray-700 capitalize w-24">
                      {day}
                    </Label>
                  </Field>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "open", e.target.value)
                      }
                      name="open"
                      disabled={!hours.isActive}
                      className="disabled:opacity-50 w-34"
                    />
                    <span className="text-gray-500">a</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "close", e.target.value)
                      }
                      name="close"
                      disabled={!hours.isActive}
                      className="disabled:opacity-50 w-34"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Configuración de Citas
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <Input
                label="Intervalo entre Citas (minutos)"
                value={settings.appointments.interval}
                onChange={(e) =>
                  handleSettingChange(
                    "appointments",
                    "interval",
                    e.target.value
                  )
                }
                name="interval"
                required
                type="number"
                min="15"
                step="15"
              />
            </div>
            <div>
              <Input
                label="Máximo de Citas por Día"
                value={settings.appointments.maxPerDay}
                onChange={(e) =>
                  handleSettingChange(
                    "appointments",
                    "maxPerDay",
                    e.target.value
                  )
                }
                name="maxPerDay"
                required
                type="number"
                min="1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Reservas en Línea
                </h3>
                <p className="text-sm text-gray-500">
                  Permitir que los clientes reserven en línea
                </p>
              </div>
              <Toggle
                checked={settings.appointments.allowOnlineBooking}
                onChange={(value) =>
                  handleSettingChange(
                    "appointments",
                    "allowOnlineBooking",
                    value
                  )
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Confirmación Requerida
                </h3>
                <p className="text-sm text-gray-500">
                  Las citas requieren confirmación
                </p>
              </div>
              <Toggle
                checked={settings.appointments.requireConfirmation}
                onChange={(value) =>
                  handleSettingChange(
                    "appointments",
                    "requireConfirmation",
                    value
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
