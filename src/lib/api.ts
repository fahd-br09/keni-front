// Static data — no backend required

export const submitContact = async (_data: unknown) => ({ ok: true });
export const getServices = async () => [];
export const getService = async (_id: string) => null;
export const getNews = async () => [];
export const getNewsItem = async (_id: string) => null;
export const getContacts = async () => [];
export const createService = async (_data: unknown) => ({});
export const updateService = async (_id: string, _data: unknown) => ({});
export const deleteService = async (_id: string) => ({});
export const createNews = async (_data: FormData) => ({});
export const updateNews = async (_id: string, _data: FormData) => ({});
export const deleteNews = async (_id: string) => ({});
export const deleteContact = async (_id: string) => ({});
export const login = async (_data: { username: string; password: string }) => ({ token: 'static-token' });
