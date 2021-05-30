package api

func formatError() map[string]interface{} {
	formatError := make(map[string]interface{})
	formatError["status"] = "error"
	formatError["message"] = "format/type error"
	return formatError
}
