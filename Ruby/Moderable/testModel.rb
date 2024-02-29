require 'httparty'
require './Moderable.rb'

class TestModel include Moderable   
    attr_accessor :text, :is_accepted
    def initialize(text)
        @text = text
        @conclusion = conclusion
    end
    def test_model
        moderation(["text"])
    end
end


test = TestModel.new("salut Jeremy je vais allez a la maison apres le karting me faire un burger")
test.test_model()
puts(test.is_accepted)

