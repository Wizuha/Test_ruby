require 'httparty'

module Moderable
    def moderation(fields_to_moderate)
        fields_to_moderate.each do |field|
            value = self.send(field)
            response = HTTParty.get("https://moderation.logora.fr/predict?text=#{value}&language=fr-FR")
            data = response.parsed_response
                if data["prediction"]["0"] >= 0.80
                self.is_accepted = false
                break
            else 
                self.is_accepted = true
            end
        end
    end
end


