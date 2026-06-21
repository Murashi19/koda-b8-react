import { useState } from "react";
import { IoClose } from "react-icons/io5";

const inputClass = (hasError) => `w-full h-11 rounded-xl border ${hasError ? "border-red-400" : "border-black/10"} bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-[#1a73e8] transition-colors placeholder:text-gray-400`;

function Label({ children, required }) {
	return (
		<label className='block text-sm font-medium text-gray-700 mb-1.5'>
			{children}
			{required && <span className='text-red-500 ml-0.5'>*</span>}
		</label>
	);
}

const REQUIRED_FIELDS = ["label", "name", "phone", "address", "kota", "provinsi", "kodePos"];

const emptyForm = {
	label: "",
	name: "",
	phone: "",
	address: "",
	kota: "",
	provinsi: "",
	kodePos: "",
};

export default function AddressModal({ initialData, onClose, onSave }) {
	const [form, setForm] = useState(initialData ?? emptyForm);
	const [errors, setErrors] = useState({});

	const isEditMode = Boolean(initialData);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const validate = () => {
		const newErrors = {};

		REQUIRED_FIELDS.forEach((field) => {
			if (!form[field]?.trim()) {
				newErrors[field] = "Wajib diisi";
			}
		});

		if (form.phone?.trim() && !/^[0-9+\-\s]{8,15}$/.test(form.phone)) {
			newErrors.phone = "Format nomor telepon tidak valid";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validate()) return;
		onSave(form);
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
			<div className='w-full max-w-lg bg-white rounded-2xl p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-medium text-gray-900'>{isEditMode ? "Edit Alamat" : "Tambah Alamat Baru"}</h2>
					<button
						type='button'
						onClick={onClose}
						className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors'>
						<IoClose className='w-4.5 h-4.5 text-gray-500' />
					</button>
				</div>

				{/* Form */}
				<div className='grid grid-cols-2 gap-4'>
					<div className='col-span-2'>
						<Label required>Label Alamat</Label>
						<input
							type='text'
							name='label'
							placeholder='Rumah, Kantor, dll.'
							value={form.label}
							onChange={handleChange}
							className={inputClass(errors.label)}
						/>
						{errors.label && <p className='text-xs text-red-500 mt-1'>{errors.label}</p>}
					</div>

					<div>
						<Label required>Nama Penerima</Label>
						<input
							type='text'
							name='name'
							placeholder='Budi Santoso'
							value={form.name}
							onChange={handleChange}
							className={inputClass(errors.name)}
						/>
						{errors.name && <p className='text-xs text-red-500 mt-1'>{errors.name}</p>}
					</div>

					<div>
						<Label required>Nomor Telepon</Label>
						<input
							type='tel'
							name='phone'
							placeholder='0812-3456-7890'
							value={form.phone}
							onChange={handleChange}
							className={inputClass(errors.phone)}
						/>
						{errors.phone && <p className='text-xs text-red-500 mt-1'>{errors.phone}</p>}
					</div>

					<div className='col-span-2'>
						<Label required>Alamat Lengkap</Label>
						<input
							type='text'
							name='address'
							placeholder='Jl. Kebon Jeruk No. 15'
							value={form.address}
							onChange={handleChange}
							className={inputClass(errors.address)}
						/>
						{errors.address && <p className='text-xs text-red-500 mt-1'>{errors.address}</p>}
					</div>

					<div>
						<Label required>Kota</Label>
						<input
							type='text'
							name='kota'
							placeholder='Jakarta Barat'
							value={form.kota}
							onChange={handleChange}
							className={inputClass(errors.kota)}
						/>
						{errors.kota && <p className='text-xs text-red-500 mt-1'>{errors.kota}</p>}
					</div>

					<div>
						<Label required>Provinsi</Label>
						<input
							type='text'
							name='provinsi'
							placeholder='DKI Jakarta'
							value={form.provinsi}
							onChange={handleChange}
							className={inputClass(errors.provinsi)}
						/>
						{errors.provinsi && <p className='text-xs text-red-500 mt-1'>{errors.provinsi}</p>}
					</div>

					<div>
						<Label required>Kode Pos</Label>
						<input
							type='text'
							name='kodePos'
							placeholder='11530'
							value={form.kodePos}
							onChange={handleChange}
							className={inputClass(errors.kodePos)}
						/>
						{errors.kodePos && <p className='text-xs text-red-500 mt-1'>{errors.kodePos}</p>}
					</div>
				</div>

				{/* Buttons */}
				<div className='flex items-center gap-3 pt-2'>
					<button
						type='button'
						onClick={onClose}
						className='flex-1 h-11 rounded-xl border border-black/10 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors'>
						Batal
					</button>
					<button
						type='button'
						onClick={handleSubmit}
						className='flex-1 h-11 rounded-xl bg-[#1a73e8] hover:bg-blue-600 text-white text-sm font-medium transition-colors'>
						{isEditMode ? "Simpan Perubahan" : "Tambah Alamat"}
					</button>
				</div>
			</div>
		</div>
	);
}
